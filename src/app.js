const express = require('express');
const {port} = require("./config/config");
const {initializeSocket} = require("./config/socket");
const {corsMiddleware} = require("./middlewares/cors");
const {rateLimits} = require("./middlewares/rateLimit");
const {timeout} = require("./middlewares/timeout");
const {route} = require("./routes/index");
const {urlencoded} = require("express");
const app = express();
const http = require('http');
const webhook = require("./api/controllers/webhookController");
const server = http.createServer(app);

app.post('/webhook', express.raw({type: 'application/json'}), webhook.handleWebhook);
initializeSocket(server);
app.use(urlencoded({extended: true}));
corsMiddleware(app);
rateLimits(app);
timeout(app);
route(app);
server.listen(port, () => {
    console.log(`Server is running on HTTP and WebSocket on port ${port}`);
});