const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
const crypto = require('crypto');
const {secret} = require("../../config/config");
const {sendMessage} = require("../../config/socket");

exports.readNotification = async (userId) => {
    try {
        return await prisma.notification.findMany({where: {deletedAt: null, userId, isRead: false}});
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.setAsRead = async (userIdParam, id) => {
    try {
        const {userId} = await prisma.notification.findFirstOrThrow({where: {id, deletedAt: null}});
        if (userId === userIdParam) {
            return await prisma.notification.update({
                where: {
                    id
                }, data: {
                    isRead: true
                }
            });
        } else throw new CustomError("Isn't your notification");
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Notification not found", 404);
        if (error instanceof CustomError) throw new CustomError(error.message, 403);
        throw new CustomError(error.message)
    }
}
exports.notifyAdmin = async (orderId, message) => {
    try {
        const {id} = await prisma.user.findUniqueOrThrow({where: {username: "admin"}})
        await prisma.notification.create({data: {userId: id, orderId, message}});

        const hash = crypto.createHmac('sha256', secret)
            .update(JSON.stringify({userId: id, orderId, message}))
            .digest('hex');
        sendMessage('notifyAdmin', {userId: id, orderId, message, hash});
        return {userId: id, orderId, message, hash};
    } catch (error) {
        throw new CustomError(error.message);
    }
};

exports.notifyUser = async (userId, orderId, message) => {
    try {
        await prisma.notification.create({data: {userId, orderId, message}});
        const hash = crypto.createHmac('sha256', secret)
            .update(JSON.stringify({userId, orderId, message}))
            .digest('hex');
        sendMessage('notifyUser', {userId, orderId, message, hash});
        return {userId, orderId, message, hash};
    } catch (error) {
        throw new CustomError(error.message);
    }
};