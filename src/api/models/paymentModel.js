const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.insertPayment = async (id, orderId, totalPrice) => {
    try {
        const payment = await prisma.payment.create({
            data: {
                method: 'card',
                status: 'pending',
                amount: totalPrice,
                currency: 'AUD',
                stripePaymentIntentId: id
            }
        });
        return await prisma.order.update({
            where: {id: orderId},
            data: {paymentId: payment["id"]},
        })
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.getPaymentByOrderId = async (orderId) => {
    try {
        const {paymentId} = await prisma.order.findFirstOrThrow({where: {id: orderId}});
        if (paymentId) {
            return await prisma.payment.findFirstOrThrow({
                where: {id: paymentId}
            });
        } else {
            return {}
        }
    } catch (error) {
        throw new CustomError(`Failed to retrieve payment: ${error.message}`);
    }
};