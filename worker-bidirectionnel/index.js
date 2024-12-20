const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');

worker.on('message', (message) => {
  console.log(`Réponse du worker : ${message}`);
});

worker.on('error', (err) => {
  console.error('Erreur dans le worker :', err);
});

const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(`Envoi au worker : ${num}`);
  worker.postMessage(num);
});

worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Worker arrêté avec le code : ${code}`);
  } else {
    console.log('Le worker a terminé.');
  }
});
