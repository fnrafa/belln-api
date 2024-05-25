const io = require('socket.io-client');

const socket = io('http://localhost:3010', {
    reconnection: true
});
socket.on('connect', () => {
    console.log('Connected to the server.');
});
socket.on('notifyAdmin', (message) => {
    console.log('New notification For Admin:', message);
});
socket.on('notifyUser', (message) => {
    console.log('New notification For User:', message);
});
socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});
socket.on('error', (error) => {
    console.error('Error:', error);
});
