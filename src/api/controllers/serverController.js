const response = require("../../utils/responses");
const service = require("../services/serverService");
const errorHandler = require("../../utils/errorHandler");
exports.serverTest = async (req, res) => {
    try {
        await service.seedRoles();
        await service.seedAccount();
        response.Success(res, 'Server and database working normally');
    } catch (error) {
        errorHandler(req, res, error);
    }
}