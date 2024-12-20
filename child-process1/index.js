const { exec } = require('child_process');

const command = process.platform === 'win32' ? 'dir' : 'ls';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors de l'exécution de la commande : ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`Erreur standard : ${stderr}`);
        return;
    }

    console.log(`Résultats de la commande "${command}":`);
    console.log(stdout);
});
