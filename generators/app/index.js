'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const exec = require('child_process').exec;

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.issueCommand = command => (
      exec(command, (err, stdout, stderr) => {
        if (err) {
          throw err;
        }
        this.log('stdout: ' + stdout);
        this.log('stderr: ' + stderr);
      })
    );
  }

  // initializing() {
  //   this.composeWith(require.resolve('../knex'));
  // }
  prompting() {
    this.log(yosay('Welcome to the lovely ' + chalk.red('opinionated-express-mvc') + ' generator!'));

    const prompts = [
      // {
      //   type: 'confirm',
      //   name: 'hasDatabase',
      //   message: 'Do you have a database for your application? (if not, we will create it for you)',
      //   default: true
      // },
      {
        type: 'input',
        name: 'dbName',
        message: 'What would you like to name your database? (leave blank if database has been created)',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const structureProject = () => {
      return new Promise((resolve, reject) => {
        fs.readdir(this.templatePath(), (err, files) => {
          if (err) {
            reject(err);
          }
          resolve(files);
        });
      });
    };

    const filterFiles = files => (
      files.filter(file => file !== 'node_modules')
        .filter(file => file !== 'yarn.lock')
    );

    const generateFiles = files => (
      files.forEach(async file => {
        await this.fs.copy(
          this.templatePath(file), this.destinationPath(file));
      })
    );

    structureProject()
      .then(files => filterFiles(files))
      .then(filteredFiles => generateFiles(filteredFiles))
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
    this.issueCommand('knex init');
  }
};
