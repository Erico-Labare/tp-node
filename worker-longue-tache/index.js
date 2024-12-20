const { Worker } = require('worker_threads');

const calculateSumOfSquares = (limit) => {
    let sum = 0;
    for (let i = 1; i <= limit; i++) {
        sum += i * i;
    }
    return sum;
};

const limit = 10000000;

console.time('Thread principal');
const resultMain = calculateSumOfSquares(limit);
console.timeEnd('Thread principal');
console.log(`Résultat dans le thread principal : ${resultMain}`);

console.time('Worker thread');
const worker = new Worker('./worker.js', { workerData: limit });

worker.on('message', (resultWorker) => {
    console.timeEnd('Worker thread');
    console.log(`Résultat dans le worker thread : ${resultWorker}`);
    worker.terminate();
});

worker.on('error', (err) => {
    console.error('Erreur dans le worker thread :', err);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker terminé avec un code d'erreur : ${code}`);
    }
});