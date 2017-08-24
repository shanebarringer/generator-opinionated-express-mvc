const fs = require('fs-extra');
const exec = require('child_process').exec;
const chalk = require('chalk');
const knexDev = require('./knexfile').development.connection.database;
const knexTest = require('./knexfile').test.connection.database;

const handleErrors = error => {
  console.log(error);
  console.log(chalk.red('please check your file system to determine if cleanup task needs to be run again'));
};

const issueCommand = command => new Promise((resolve, reject) =>
  exec(command, (err, stdout) => (err ? reject(err) : resolve(stdout))));

const dropDB = db => (
  issueCommand(`dropdb ${db}`)
  .then(() => console.log(chalk.inverse(`${db} has been dropped`)))
  .then(() => issueCommand(`createdb ${db}`))
  .then(() => console.log(`${db} has been re-created`))
  .catch(err => console.log(err))
);

const rootFiles = () => new Promise((resolve, reject) =>
  fs.readdir(__dirname, (err, files) => (err ? reject(err) : resolve(files))));

const appendFileName = file => new Promise(resolve =>
  fs.lstat(file, (err, stat) => resolve([stat, file])));

const onlyDirectories = stats => stats
  .filter(stat => stat[0].isDirectory())
  .map(stat => stat[1])
  .filter(dir => !dir.includes('node_modules'))
  .filter(dir => !dir.includes('.git'));

const newIndex = () => fs.writeFile('./routes/index.js',
  `const express = require('express');
  const app = express();
  module.exports = app`, err => {
    if (err) throw err;
    console.log('All done!');
  }
);

rootFiles()
.then(files => files.map(file => `${__dirname}/${file}`))
.then(files => Promise.all(files.map(file => appendFileName(file))))
.then(stats => onlyDirectories(stats))
.then(filenames => Promise.all(filenames.map(filename => fs.emptyDir(filename))))
.then(() => dropDB(knexDev))
.then(() => dropDB(knexTest))
.then(() => newIndex())
.catch(err => handleErrors(err));
