const jwt = require('jsonwebtoken');
const {secret} = require("../config/config");
const generateToken = (id) => {
    return jwt.sign({id}, secret, {expiresIn: '24h'});
};
module.exports = generateToken;