const CustomError = require("../../utils/customError");
const orderModel = require("../models/orderModel");
const notifyModel = require("../models/notificationModel");
const {getDetailOrderItem} = require("../models/orderItemModel");
const {decrementStock, getItemTypeIsExist} = require("../models/itemModel");
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
exports.updateStatusService = async (id, statusParam) => {
    const {status, userId} = await orderModel.getDetailOrder(id);
    if (status === statusParam) throw new CustomError("Status Already " + statusParam, 409);
    if (userId && statusParam === 'accepted') {
        const orderItems = await getDetailOrderItem(id);
        for (const {itemTypeId, quantity} of orderItems) {
            const {stock, type} = await getItemTypeIsExist(itemTypeId);
            if (stock < quantity) throw new CustomError(`Insufficient stock for item ` + type, 409);
            await decrementStock(itemTypeId, quantity);
        }
        await notifyModel.notifyUser(userId, id, "Your Order Was Confirmed, Please make a checkout");
    }
    if (userId && statusParam === 'rejected') await notifyModel.notifyUser(userId, id, "Your Order Was Rejected, Make Sure Your Order and try again");
    await orderModel.updateStatus(id, statusParam);
}