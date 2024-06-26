const express = require("express");
const guestRoutes = require('./guestRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const response = require("../utils/responses");
const responseTime = require('response-time');
const {serverTest} = require('../api/controllers/serverController');
const {join} = require("path");
exports.route = (app) => {
    app.use(express.json());

    app.use(responseTime());
    app.use('/auth', authRoutes);
    app.use('/guest', guestRoutes);
    app.use('/user', userRoutes);
    app.use('/admin', adminRoutes);
    app.use('/server', serverTest);

    app.use('/images', express.static(join(__dirname, '../../public/images')));

    app.use('/*', (req, res) => {
        response.MethodNotAllowed(res);
    });
}