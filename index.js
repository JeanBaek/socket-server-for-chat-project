const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send('<h1>health check: Welcome :)</h1>');
});

io.on('connection', (socket) => {
    console.log('socket: a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});