const path = require('path');
const dotenv = require('dotenv');
const {existsSync} = require("fs");
let envFilePath = '.env';
if (!existsSync(envFilePath)) {
    envFilePath = path.join('..', '.env');
}
dotenv.config({path: envFilePath});
const getEnvVariable = (varName) => {
    const value = process.env[varName];
    if (value === undefined) {
        console.log(`Error: Environment variable ${varName} is not defined.`);
        process.exit(1);
    }
    return value;
};
const config = {
    port: getEnvVariable('PORT'),
    baseUrl: getEnvVariable('BASE_URL'),
    secret: getEnvVariable('SECRET'),
    mailerUser: getEnvVariable('MAILER_USER'),
    mailerPass: getEnvVariable('MAILER_PASS'),
    tempPath: getEnvVariable('TEMP_PATH'),
    imagePath: getEnvVariable('IMAGE_PATH'),
    stripeSecretKey: getEnvVariable('STRIPE_SECRET_KEY'),
    stripeWebhookSecret: getEnvVariable('STRIPE_WEBHOOK_SECRET'),
    stripePublishableKey: getEnvVariable('STRIPE_PUBLISHABLE_KEY')
};
module.exports = config;