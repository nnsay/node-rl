/**
 * Read line
 */

const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

class ReadLine extends EventEmitter {
  constructor(path, options) {
    super();
    this.readStream = fs.createReadStream(path, options);
    this.readStream.on('error', function (err) {
      console.error(err);
    });
    this.temps = [];
    this.readStream.on('data', (chunk) => {
      this.readStream.pause();
      if (this.temps.length) {
        chunk = this.temps.join('') + chunk;
        this.temps = [];
      }
      const chunks = chunk.split('\n');
      if (chunks.length === 1) {
        this.temps.push(chunk);
      } else {
        this.temps.push(chunks.pop()); // last chunk maybe cutoff, so save in temps for next process
        chunks.forEach(row => {
          this.emit('row', row);
        });
      }
      this.readStream.resume();
    });
    this.readStream.on('end', () => {
      if (this.temps.length) {
        this.temps.join('').split('\n').forEach(row => {
          this.emit('row', row);
        });;
        this.temps = [];
      }
      this.emit('end');
    });
  }
}

module.exports = ReadLine;