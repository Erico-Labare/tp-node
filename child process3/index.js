const { fork } = require("child_process");

const child = fork("./worker.js");

child.on("message", (message) => {
  console.log(`Message : ${message}`);
});

child.on("close", (code) => {
  console.log(`Processus enfant terminé avec le code : ${code}`);
});