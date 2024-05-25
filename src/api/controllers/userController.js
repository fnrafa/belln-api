const service = require("../services/userService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getAllUser = async (req, res) => {
    try {
        const user = await service.getAllUserService();
        response.Success(res, 'Read all user success', user);
    } catch (error) {
        errorHandler(req, res, error);
    }
}