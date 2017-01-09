/* eslint-disable */
const path = require('path');
const fs = require('fs');
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, './.babelrc')).toString());
require('babel-register')(babelrc);
require('../tools/build');
