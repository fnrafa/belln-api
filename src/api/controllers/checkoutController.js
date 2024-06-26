const service = require("../services/checkoutService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.checkout = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.body;
        const checkout = await service.CheckoutService(userId, orderId)
        response.Success(res, 'Get Intent Success', checkout);
    } catch (error) {
        errorHandler(req, res, error);
    }
}