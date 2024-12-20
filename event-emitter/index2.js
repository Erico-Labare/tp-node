const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    triggerEvent(data) {
      console.log('Méthode triggerEvent appelée, déclenchement de customEvent avec des données...');
      this.emit('customEvent', data);
    }
  }

const myEmitter = new MyEmitter();

myEmitter.on('customEvent', (data) => {
    console.log('L\'événement customEvent a été déclenché avec les données :', data);
  });

  myEmitter.triggerEvent({ message: 'Bonjour, tout le monde !' });