'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const exec = require('child_process').exec;

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.issueCommand = command => {
      return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => err ? reject(err) : resolve(stdout));
      });
    };
  }

  prompting() {
    this.log(yosay('Welcome to the lovely ' + chalk.red('opinionated-express-mvc') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        required: true,
        name: 'appName',
        message: chalk.cyan('What would you like to name this application?')
      },
      {
        type: 'confirm',
        name: 'hasDatabase',
        message: `Have you created a database? (y/n) ${chalk.inverse('No worries if not! We\'ll create one for you momentarily.')} 😎`,
        default: false
      },
      {
        type: 'input',
        name: 'dbName',
        message: `What would you like to name your new (or existing) database? ${chalk.underline('leave blank to use your application name')}`,
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.dbName = props.dbName ? props.dbName : this.props.appName;
    });
  }

  writing() {
    const structureProject = () => {
      return new Promise((resolve, reject) => {
        fs.readdir(this.templatePath(), (err, files) => err ? reject(err) : resolve(files));
      });
    };

    const filterFiles = files => (
      files.filter(file => file !== 'node_modules')
        .filter(file => file !== 'yarn.lock')
        .filter(file => file !== 'knexfile.js')
        .filter(file => file !== 'package.json')
    );

    const generateFiles = files => (
      files.forEach(file => {
        this.fs.copy(
          this.templatePath(file), this.destinationPath(`${this.props.appName}/${file}`));
      })
    );

    const generateTemplate = file => this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`${this.props.appName}/${file}`), {
        db: this.props.dbName,
        appName: this.props.appName
      }
    );

    this.issueCommand(`mkdir ${this.props.appName}`)
      .then(() => process.chdir(`${this.props.appName}`))
      .then(() => this.issueCommand(`pwd`))
      .then(where => this.log(chalk.red(where)))
      .then(() => structureProject())
      .then(files => filterFiles(files))
      .then(filteredFiles => generateFiles(filteredFiles))
      .then(() => generateTemplate('package.json'))
      .then(() => generateTemplate('knexfile.js'))
      .catch(err => new Error(err));
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }

  end() {
    const db = this.props.dbName;

    const dbMigrate = env => {
      this.log(chalk.underline(`🚜 migrating ${db}_${env} database 🚜`));
      this.issueCommand(`knex migrate:latest --env ${env}`)
        .then(() => this.log(`🌱 seeding ${db}_${env} database 🌱`))
        .then(() => this.issueCommand(`knex seed:run --env ${env}`))
        .catch(error => this.log(error));
    };

    const dbSetup = env => {
      this.log(`🏗️ setting up ${db}_${env} database 🏗️`);
      this.issueCommand(`createdb ${db}_${env}`)
        .then(() => dbMigrate(env))
        .catch(error => handleDbError(error, env));
    };

    const handleDbError = (error, env) => {
      if (error.toString().includes(`already exists`)) {
        this.log(chalk.red(
          `${db}_${env} already exists, attempting to drop and re-create`
        ));
        this.issueCommand(`dropdb ${db}_${env}`)
          .then(() => dbSetup(env));
      } else {
        this.log(chalk.red(error));
      }
    };

    const runYarn = () => {
      this.log(chalk.yellow('hang on we are installing your dependencies'));
      this.issueCommand(`yarn`)
        .then(output => this.log(output))
        .then(() => {
          if (this.props.hasDatabase) {
            dbMigrate('dev');
            dbMigrate('test');
          } else {
            dbSetup('dev');
            dbSetup('test');
          }
        })
        .catch(err => this.log(err));
    };

    runYarn();
  }
};
