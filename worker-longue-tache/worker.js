const { parentPort, workerData } = require('worker_threads');

const calculateSumOfSquares = (limit) => {
    let sum = 0;
    for (let i = 1; i <= limit; i++) {
        sum += i * i;
    }
    return sum;
};

const result = calculateSumOfSquares(workerData);
parentPort.postMessage(result);