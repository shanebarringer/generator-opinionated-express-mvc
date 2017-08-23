# opinionated-express-mvc [![NPM version][npm-image]][npm-url]
> Scaffolding for building an Express API

## Description

Sets up an Express API configured for use with Postgres database through bookshelf and knex. Includes two resources with restful route configuraiton and associations.

_This generator assumes user has postgres installed and running on your machine._

## Installation

### Global Install

To install globally, simply run:

```bash
npm install -g yo
npm install -g generator-opinionated-express-mvc
```

### Local Install

If you don't have permissions to install packages globally follow the following steps

```bash
$ mkdir <your-app-name>
$ cd <your-app-name>
$ yarn init -y
$ yarn add yo
$ yarn add https://github.com/shanebarringer/generator-opinionated-express-mvc.git
```

## Setup

To generate your new project run:

##### global

```bash
$ yo opinionated-express-mvc
```

##### local

```bash
$ yarn yo opinionated-express-mvc
```

_note: this generator creates a directory for your project. If you've run the local install option, your project will be nested in a new directory. To fix this issue, `mv` the entire directory up one level by running `$ mv <your-app-name>/* ./ && mv <your-app-name>/.* ./`_

Once the install/setup is complete, you'll be able to run the server and view the available resources at `http://localhost:3001`. Once satisfied, run the cleanup script.

```bash
$ yarn cleanup
```

This command will leave the directory structure intact, while removing the existing models, migrations, seeds, routes, etc.


## Todo

* Add test configuration with Mocha and Chai
* Add additional logic (and prompts) for using alternative relational databases technologies
* Scaffolding commands
* Potential support for adding a React view layer

## Contributing

* fork/clone
* make changes
* submit a PR ![](http://cultofthepartyparrot.com/parrots/parrot.gif)

## License

MIT © [shane barringer]()

[npm-image]: https://badge.fury.io/js/generator-opinionated-express-mvc.svg
[npm-url]: https://npmjs.org/package/generator-opinionated-express-mvc
[daviddm-image]: https://david-dm.org/shanebarringer/generator-opinionated-express-mvc.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/shanebarringer/generator-opinionated-express-mvc
