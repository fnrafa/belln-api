const CustomError = require("../../utils/customError");
const {createPaymentIntent} = require("../../utils/stripe");
const {getDetailOrder} = require("../models/orderModel");
const {insertPayment, getPaymentByOrderId} = require("../models/paymentModel");
const {baseUrl} = require("../../config/config");

exports.CheckoutService = async (userId, orderId) => {
    const order = await getDetailOrder(orderId);
    if (!order) throw new CustomError('Order not found', 404);
    if (order["status"] !== "accepted") throw new CustomError("This order is not confirmed", 409);
    if (!Array.isArray(order.orderItems)) throw new CustomError("Order items are not valid", 400);

    const existingPayment = await getPaymentByOrderId(orderId);

    if (existingPayment && existingPayment["status"] === 'succeeded') {
        return {
            message: "There is no payment needed for this order as it has already been paid.",
            orderId: orderId,
            amount: existingPayment["amount"],
            currency: existingPayment["currency"],
        };
    }

    const amount = await order.orderItems.reduce((total, orderItem) => {
        return total + (orderItem.itemType.price * orderItem.quantity);
    }, 0);
    const adminPrice = amount * 0.10;
    const totalPrice = amount + adminPrice;

    const paymentIntent = await createPaymentIntent(totalPrice, "AUD", {userId, orderId});
    const payment = await insertPayment(paymentIntent.id, orderId, totalPrice);

    const paymentLink = `${baseUrl}/user/order/payment/${paymentIntent.client_secret}`;

    return {
        paymentLink,
        clientSecret: paymentIntent.client_secret,
        orderId: orderId,
        paymentId: payment["id"],
        amount: amount,
        adminPrice: adminPrice,
        totalPrice: totalPrice,
        currency: "AUD",
        paymentExpiresAt: new Date(Date.now() + 60 * 60 * 1000)
    };
};