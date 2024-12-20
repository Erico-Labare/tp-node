const { parentPort } = require('worker_threads');

parentPort.on('message', (number) => {
  const result = number * 2;
  parentPort.postMessage(result);
});