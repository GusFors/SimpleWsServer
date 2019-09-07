const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });

    //ws.send(JSON.stringify({message: 'Welcome!'}));
});

wss.broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {


            client.send(data)


        }
    })
}

setInterval(() => {
    wss.broadcast(JSON.stringify({ message: 'this is a heartbeat', when: new Date(), name: 'Server' }))
  }, 30000)