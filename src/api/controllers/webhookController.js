const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {handleWebhook} = require('../../utils/stripe');
const CustomError = require("../../utils/customError");
const response = require("../../utils/responses");
const notifyModel = require("../models/notificationModel");

exports.handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = handleWebhook(req, sig);
    } catch (err) {
        response.BadRequest(res, `Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            await updatePaymentStatus(paymentIntent.id, 'succeeded');
            try {
                const order = await prisma.order.findFirstOrThrow({
                    where: {
                        payment: {
                            stripePaymentIntentId: paymentIntent.id
                        }
                    }
                });
                await notifyModel.notifyAdmin(order["id"], "Order payment success, handle your client order now");
            } catch (error) {
                throw new CustomError(`Failed to notify admin: ${error.message}`)
            }
            await notifyModel.notifyAdmin(id, "Order payment success, handle your client order now");
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            await updatePaymentStatus(paymentIntentFailed.id, 'failed');
            break;
        default:
    }
    response.Success(res, {received: true})
};

const updatePaymentStatus = async (stripePaymentIntentId, status) => {
    try {
        await prisma.payment.update({
            where: {stripePaymentIntentId: stripePaymentIntentId},
            data: {status: status},
        });
    } catch (error) {
        throw new CustomError(`Failed to update payment status: ${error.message}`);
    }
};