const service = require("../services/orderService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getOrder = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await service.getOrderService(id);
        response.Success(res, 'Read order user success', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.getAllOrder = async (req, res) => {
    try {
        const data = await service.getAllOrderService();
        response.Success(res, 'Read all order success', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {addressId, delivered, orderItems} = req.body;
        const data = await service.addOrderService(userId, addressId, delivered, orderItems);
        response.Created(res, 'Order successfully created', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.updateStatus = async (req, res) => {
    try {
        const {id, status} = req.body;
        await service.updateStatusService(id, status);
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}