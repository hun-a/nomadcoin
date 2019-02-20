const WebSockets = require('ws');

const sockets = [];

const getSockets = () => sockets;

const startP2PServer = server => {
  const wsServer = new WebSockets.Server({ server });

  wsServer.on('connection', ws => {
    initSocketConnection(ws);
  });
  console.log(`Nomadcoin P2PServer Runnging!`);
};

const initSocketConnection = socket => {
  sockets.push(socket);
  socket.on('message', data => {
    console.log(data);
  });

  setTimeout(() => socket.send('Welcome'), 5000);
};

const connectToPeers = newPeer => {
  const ws = new WebSockets(newPeer);
  ws.on('open', () => {
    initSocketConnection(ws);
  });
};

module.exports = {
  startP2PServer,
  connectToPeers
};