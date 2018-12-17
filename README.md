### 1. 自述

按行读取大文件, nodejs工具包.

### 2. 原理

利用[stream.Readable](http://nodejs.cn/api/stream.html#stream_class_stream_readable)读取按照一定大小chunk读取大文件, 读取后检查换行符, 一行一行的发送数据给调用者.

### 3. 使用

```:javascript
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
```