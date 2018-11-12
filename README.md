# Random Quote Generator

## Overview

Generates quotes from the [Forismatic](http://forismatic.com/en/) API with the ability to tweet the quote generated.

## Requirements

Node version 8.11.4 or greater:

```terminal
$ node --version
8.11.4
```

NPM version 5.6.0 or greater:

```terminal
$ npm --version
5.6.0
```

NPX version 9.7.1 or greater

```terminal
$ npx --version
9.7.1
```

Gulp version 4 or greater (See [Installation](##Installation)) if you have version 3.

## Features

- Modular CSS with Sass.
- Build System with Gulp & Browsersync
- Layout with Flexbox.

## Installation

This requires Gulp version 4 or greater. Gulp version 3 bundled the command line interface (CLI) with the library and now the CLI is a standalone package.

Open your terminal program and check your Gulp version to see if you have version 3.

```terminal
$ gulp -v
[11:44:10] CLI version 2.0.1
[11:44:10] Local version 3.9.1
```

If you have previously installed Gulp version 3 globally (with -g flag), remove it.

```terminal
npm uninstall -g gulp
```

Install the new standalone Gulp CLI globally.

```terminal
npm install -g gulp-cli
```

In your terminal, navigate to your desired directory and clone this repository using git.

```terminal
git clone https://github.com/begroff/random-quote-generator.git
```

Navigate to the `random-quote-generator` directory.

```terminal
cd random-quote-generator
```

Run `npm install` to install dependencies.

```terminal
npm install
```

After the dependencies are installed, run `gulp`. This will run the tasks for the build, start browser sync and watch html, css, and javascript files for changes.

```terminal
gulp
```