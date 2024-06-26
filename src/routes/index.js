const express = require("express");
const guestRoutes = require('./guestRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const response = require("../utils/responses");
const responseTime = require('response-time');
const {serverTest} = require('../api/controllers/serverController');
const {join} = require("path");
const {handleWebhook} = require("../api/controllers/webhookController");
exports.route = (app) => {
    app.use(express.json());

    app.use(responseTime());
    app.use('/api/auth', authRoutes);
    app.use('/api/guest', guestRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/server', serverTest);

    app.use('/api/images', express.static(join(__dirname, '../../public/images')));
    app.post('/api/webhook', handleWebhook);
    app.use('/api/*', (req, res) => {
        response.MethodNotAllowed(res);
    });
}