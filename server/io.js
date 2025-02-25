const http = require('http');
const { Server } = require('socket.io');
let io;

const handleChatMessage = (msg) => {
    console.log(msg);
    io.emit(msg.channel, msg.message);
};

const socketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disonnected');
        });

        socket.on('chat message', handleChatMessage);
    });

    return server;
};

module.exports = socketSetup;