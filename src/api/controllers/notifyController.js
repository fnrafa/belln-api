const service = require("../services/notifyService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getNotification = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await service.getNotificationService(id);
        response.Success(res, 'Read user notification success', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.setAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.body;
        await service.setAsReadService(userId, id);
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}