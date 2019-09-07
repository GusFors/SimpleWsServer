
const express = require('express')

const websocket = require('ws')
const http = require('http')
const app = express()
const server = http.createServer(app)
const wss = new websocket.Server({ server })
app.set('port', (process.env.PORT || 8080))
app.use((req, res, next) => {
   
    res.send('IndexPage')
  })

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
server.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}...`))

setInterval(() => {
    wss.broadcast(JSON.stringify({ message: 'this is a heartbeat', when: new Date(), name: 'Server' }))
  }, 30000)