const { spawn } = require('child_process');

const child = spawn('node', ['-i'], { stdio: ['pipe', 'pipe', 'inherit'] });

child.stdout.on('data', (data) => {
  console.log(`Sortie du processus enfant : ${data}`);
});

child.stdin.write(`console.log('Hello from child!');\n`);
child.stfin.end()

setTimeout(() => {
  child.stdin.end();
}, 1000);
