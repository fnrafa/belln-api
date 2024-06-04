const service = require("../services/authService");
const response = require('../../utils/responses');
const errorHandler = require("../../utils/errorHandler");
exports.register = async (req, res) => {
    try {
        const {email, username, fullname, password, phone} = req.body;
        const register = await service.registerService(email, username, password, fullname, phone)
        response.Created(res, 'User created successfully', register);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const login = await service.loginService(username, password);
        response.Success(res, "Authenticated successfully", login);
    } catch (error) {
        errorHandler(req, res, error);
    }
};