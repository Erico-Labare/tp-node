const { Worker } = require('worker_threads');

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: data });

    worker.on('message', resolve);

    worker.on('error', reject);

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

(async () => {
    const data = { num1: 10, num2: 5, operation: 'multiply' };
    const result = await runWorker(data);
    console.log(`Le résultat est : ${result}`);
  })();