const {Server} = require("socket.io");
let io;

exports.initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected with socket id:', socket.id);
        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
    return io;
}

exports.sendMessage = (event, message) => {
    if (io) {
        io.emit(event, message);
        console.log(`Message sent on event '${event}':`, message);
    } else {
        console.log("Socket.io is not initialized.");
    }
};
