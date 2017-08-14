'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const issueCommand = command => (
  exec(command, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    this.log('stdout: ' + stdout);
    this.log('stderr: ' + stderr);
  })
);

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'something?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log('writing knexfile')
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
