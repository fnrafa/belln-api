const Stripe = require('stripe');
const { stripeSecretKey, stripeWebhookSecret } = require('../config/config');

const stripe = Stripe(stripeSecretKey);

const createPaymentIntent = async (amount, currency, metadata) => {
    return await stripe.paymentIntents.create({
        amount,
        currency,
        metadata
    });
};

const handleWebhook = (req, sig) => {
    try {
        return stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    } catch (err) {
        throw new Error(`Webhook Error: ${err.message}`);
    }
};

module.exports = {
    createPaymentIntent,
    handleWebhook
};
