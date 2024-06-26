const Stripe = require('stripe');
const { stripeSecretKey, stripeWebhookSecret } = require('../config/config');
const CustomError = require("./customError");

const stripe = Stripe(stripeSecretKey);

const createPaymentIntent = async (amount, currency, metadata) => {
    return await stripe.paymentIntents.create({
        amount,
        currency,
        metadata
    });
};

const handleWebhook = (body, sig) => {
    try {
        return stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
    } catch (err) {
        throw new CustomError(`Webhook Error: ${err.message}`);
    }
};

module.exports = {
    createPaymentIntent,
    handleWebhook
};
