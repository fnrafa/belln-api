const jwt = require('jsonwebtoken');
const {secret} = require("../config/config");
const response = require("../utils/responses");
const model = require("../api/models/userModel");
const authorize = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            let token;
            if (req.headers.authorization) {
                if (req.headers.authorization.startsWith('Bearer ')) {
                    token = req.headers.authorization.replace('Bearer ', '');
                } else {
                    token = req.headers.authorization;
                }
            } else return response.Unauthorized(res, "No Token Provided");
            const decoded = jwt.verify(token, secret);
            const user = await model.findRoleById(decoded.id);
            if (allowedRoles.length > 0 && !allowedRoles.includes(user.role.name)) return response.Forbidden(res, "Access denied");
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') return response.Unauthorized(res, 'Invalid Token');
            response.InternalServerError(res);
        }
    };
};
module.exports = authorize;