const CustomError = require("../../utils/customError");
const notificationModel = require("../models/notificationModel");
exports.getNotificationService = async (id) => {
    const notify = await notificationModel.readNotification(id);
    if (notify.length === 0) throw new CustomError("Notification all clear", 200);
    return notify;
}
exports.setAsReadService = async (userId, id) => {
    return await notificationModel.setAsRead(userId, id);
}