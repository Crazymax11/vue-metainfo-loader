/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const { extractMeta } = require('../index.js');

const testDirectories = fs
  .readdirSync('tests', { withFileTypes: true })
  .filter(directoryItem => {
    console.log('==========');
    console.log('==========');
    console.log('==========');
    console.log(directoryItem);
    console.log(path.resolve('tests', directoryItem));
    const stat = fs.statSync(path.resolve('tests', directoryItem));
    return stat.isDirectory();
  });

describe('extractMeta', () => {
  testDirectories.forEach(directory => {
    it(directory, () => {
      const componentPath = path.resolve('tests', directory, 'component.vue');
      const code = fs.readFileSync(componentPath, 'utf-8');

      const expectedResultPath = path.resolve(
        'tests',
        directory,
        'expected.js',
      );

      // eslint-disable-next-line
      const expectedResult = require(expectedResultPath);
      expect(extractMeta(code)).toEqual(expectedResult);
    });
  });
});
