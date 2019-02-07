import fs from 'fs';
import path from 'path';
import enoughTimeAgo from '../index';
// const enoughTimeAgo = require('../index');
const timeHasPassed = require('../index');

function writeFile(file: string, value: string = 'test'): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, value);
  }
}
function delFile(file: string): void {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

beforeEach(() => {
  writeFile(path.resolve(__dirname, 'testFileOld'));
  writeFile(path.resolve(__dirname, 'testFileNew'));
});

afterEach(() => {
  // delFile(path.resolve(__dirname, 'testFileOld'));
  delFile(path.resolve(__dirname, 'testFileNew'));
});

test('Nonexistent file - return undefined', () => {
  expect(enoughTimeAgo('./nonFile')).toBeUndefined();
  expect(enoughTimeAgo('./nonFile', 'modified', 10000)).toBeUndefined();
  expect(enoughTimeAgo('./nonFile', 'created', 10000)).toBeUndefined();
  expect(enoughTimeAgo('./nonFile', 'changed', 10000)).toBeUndefined();
  expect(enoughTimeAgo('./nonFile', 'accessed', 10000)).toBeUndefined();
});

test('Enough time ago - false', () => {
  const file = 'testFileNew';
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'modified', 10000)).toBe(
    false
  );
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'created', 10000)).toBe(
    false
  );
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'changed', 10000)).toBe(
    false
  );
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'accessed', 10000)).toBe(
    false
  );
});

test('Enough time ago - true', () => {
  const file = 'testFileOld';
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'modified', 0)).toBe(
    true
  );
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'created', 0)).toBe(true);
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'changed', 0)).toBe(true);
  expect(enoughTimeAgo(path.resolve(__dirname, file), 'accessed', 0)).toBe(
    true
  );
});

test('timeHasPassed fun', () => {
  const file = 'testFileOld';
  const POSIX = new Date().getTime();
  expect(
    timeHasPassed(path.resolve(__dirname, file), POSIX, 'modified')
  ).toBeDefined();
});
