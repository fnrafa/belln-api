const Joi = require('joi');
const fieldDefinitions = {
    address: Joi.string().min(4).required(),
    addressId: Joi.string().guid({version: 'uuidv4'}).required(),
    category: Joi.string().required().min(3),
    city: Joi.string().min(3).required(),
    code: Joi.number().integer().min(0).max(999999).required(),
    country: Joi.string().min(3).max(56).required(),
    delivered: Joi.boolean().required(),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    fullname: Joi.string().min(4).max(56).required(),
    id: Joi.string().guid({version: 'uuidv4'}).required(),
    image: Joi.required(),
    name: Joi.string().required().min(3),
    orderItems: Joi.array().items(Joi.object({
        itemTypeId: Joi.string().guid({version: 'uuidv4'}).required(),
        quantity: Joi.number().integer().min(1).required()
    })).min(1).required(),
    password: Joi.string().min(8).max(15).required(),
    paymentId: Joi.string().guid({version: 'uuidv4'}),
    price: Joi.number().required(),
    refill: Joi.boolean().required(),
    repeat_password: Joi.string().equal(Joi.ref('password')).required(),
    stock: Joi.number().integer().required(),
    type: Joi.string().required().min(3),
    username: Joi.string().min(4).max(12).required(),
    zipCode: Joi.string().min(1).max(10).required(),
    status: Joi.string().valid('pending', 'accepted', 'failed', 'rejected', 'done', 'success', 'canceled').default('pending').required()
};
module.exports = fieldDefinitions;