/* eslint-disable import/no-extraneous-dependencies */
import { rollup } from 'rollup';
import fs from 'fs-promise';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const configs = [{
  entry: path.resolve(__dirname, '../modules/index.js'),
  format: 'cjs',
  dest: path.resolve(__dirname, '../dist/react-motion-flip-animated.js'),
  sourceMap: true,
  plugins: [
    resolve({
      extensions: ['.js', '.json', '.jsx'],
      skip: ['react', 'react-motion', 'invariant'],
    }),
    commonjs(),
    babel({
      babelrc: false,
      externalHelpers: false,
      runtimeHelpers: true,
      exclude: '**/node_modules/**/*.*',
      presets: ['es2015-rollup', ['latest', {
        es2015: false,
      }], 'react'],
      plugins: ['transform-runtime'],
    }),
  ],
}, {
  entry: path.resolve(__dirname, '../modules/index.js'),
  format: 'es',
  dest: path.resolve(__dirname, '../dist/react-motion-flip-animated.mjs'),
  sourceMap: true,
  plugins: [
    resolve({
      extensions: ['.js', '.json', '.jsx'],
      skip: ['react', 'react-motion', 'invariant'],
    }),
    commonjs(),
    babel({
      babelrc: false,
      externalHelpers: false,
      runtimeHelpers: true,
      exclude: '**/node_modules/**/*.*',
      presets: ['es2015-rollup', ['latest', {
        es2015: false,
      }], 'react'],
      plugins: 'transform-runtime',
    }),
  ],
}];

async function bundle(config) {
  const result = await rollup(config);
  await result.write(config);
}

async function build() {
  await fs.emptyDir(path.resolve(__dirname, '../dist'));
  await Promise.all([configs.map(bundle)]);
}

build()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
