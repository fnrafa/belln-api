const CustomError = require("../../utils/customError");
const orderModel = require("../models/orderModel");
const notifyModel = require("../models/notificationModel");
exports.getOrderService = async (id) => {
    const order = await orderModel.readOrder(id);
    if (order.length === 0) throw new CustomError("You didn't have any order", 404);
    return order;
}
exports.getAllOrderService = async () => {
    const order = await orderModel.readAllOrder();
    if (order.length === 0) throw new CustomError("No order found", 404);
    return order;
}
exports.addOrderService = async (userId, addressId, delivered, orderItems) => {
    const {id, status} = await orderModel.addOrder(userId, addressId, delivered, orderItems);
    if (id) await notifyModel.notifyAdmin(id, "New Order need to be confirmed");
    return {id, status};
}
exports.updateStatusService = async (id, status) => {
    await orderModel.getDetailOrder(id);
    const {userId} = await orderModel.updateStatus(id, status);
    if (userId && status === 'accepted') await notifyModel.notifyUser(userId, id, "Your Order Was Confirmed, Please make a checkout");
    if (userId && status === 'rejected') await notifyModel.notifyUser(userId, id, "Your Order Was Rejected, Make Sure Your Order and try again");
}