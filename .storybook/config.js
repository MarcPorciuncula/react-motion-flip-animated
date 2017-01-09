/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@kadira/storybook';

function load() {
  const req = require.context('../examples', true, /.stories.jsx?/);
  const filenames = req.keys();
  filenames.forEach(filename => req(filename));
}

configure(load, module);
