# opinionated-express-mvc [![NPM version][npm-image]][npm-url] [![Build Status]] [![Dependency Status][daviddm-image]][daviddm-url]
> Scaffolding for express API

## Description

Sets up an Express API configured for use with Postgres database using bookshelf and knex. Includes two resources with restful route configuraiton and associations.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-opinionated-express-mvc using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

This generator assumes user has postgres installed and running.

```bash
npm install -g yo
npm install -g generator-opinionated-express-mvc
```

Then generate your new project:

```bash
yo opinionated-express-mvc
```

## Todo

* Add test configuration with Mocha and Chai
* Provide additional seed data
* Add additional logic (and prompts) for using additional relational databases technologies
* Potential support for adding a React view layer

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [shane barringer]()

[npm-image]: https://badge.fury.io/js/generator-opinionated-express-mvc.svg
[npm-url]: https://npmjs.org/package/generator-opinionated-express-mvc
[daviddm-image]: https://david-dm.org/shanebarringer/generator-opinionated-express-mvc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/shanebarringer/generator-opinionated-express-mvc
