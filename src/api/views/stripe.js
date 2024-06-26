const { stripePublishableKey } = require('../../config/config');

exports.payment = (req, res) => {
    const clientSecret = req.params.key;
    const paymentPageHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Stripe Payment</title>
        <script src="https://js.stripe.com/v3/"></script>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                min-width: 90vw;
                max-width: 400px;
            }
            .button {
                margin-top: 20px;
                background-color: #6772E5;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .button:disabled {
                background-color: #cccccc;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Complete Your Payment</h2>
            <form id="payment-form">
                <div id="card-element">
                </div>
                <button id="submit" class="button">Pay</button>
                <div id="error-message" role="alert"></div>
            </form>
        </div>
        <script>
            const stripe = Stripe('${stripePublishableKey}');
            const elements = stripe.elements();
            const card = elements.create('card');
            card["mount"]('#card-element');

            const form = document.getElementById('payment-form');
            const submitButton = document.getElementById('submit');

            form.addEventListener('submit', async function(event) {
                event.preventDefault();
                submitButton.disabled = true;

                const { error } = await stripe["confirmCardPayment"]('${clientSecret}', {
                    payment_method: {
                        card: card,
                        billing_details: {
                            name: 'Cardholder Name',
                        },
                    },
                });

                if (error) {
                    document.getElementById('error-message').textContent = error.message;
                    submitButton.disabled = false;
                } else {
                    document.getElementById('error-message').textContent = 'Payment successful!';
                    submitButton.disabled = false;
                }
            });
        </script>
    </body>
    </html>
    `;

    res.send(paymentPageHtml);
};
