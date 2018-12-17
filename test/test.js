const path = './test/data.csv';
const options = {
  encoding: 'utf8',
  highWaterMark: 1024
}
const ReadLine = require('../');
const rl = new ReadLine(path, options);
const assert = require('assert');
let i = 0;

rl.on('row', function (row) {
  console.log(++i, row);
});
rl.on('end', function () {
  assert.equal(i, 5, 'failure');
});