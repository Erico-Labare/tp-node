const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('greet', () => {
  console.log('Bonjour, tout le monde !');
});

myEmitter.emit('greet');