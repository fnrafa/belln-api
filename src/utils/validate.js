const response = require('./responses');
const Joi = require('joi');
const field = require("./validations/schemaValidator");
const validate = (fields) => (req, res, next) => {
    const schema = fields.reduce((acc, fieldName) => {
        if (field[fieldName]) acc[fieldName] = field[fieldName];
        else return response.InternalServerError(res, `No validation rule defined for ${fieldName}`);
        return acc;
    }, {});
    const validationSchema = Joi.object(schema);
    const {error} = validationSchema.validate(req.body, {abortEarly: false});
    if (error) {
        const isUnknownKeyError = error.details.some(detail => detail.type === 'object.unknown');
        if (isUnknownKeyError) return response.BadRequest(res, "Request contains unexpected fields.");
        else return response.UnprocessableEntity(res, error.details.map(err => err.message).join(", "));
    }
    next();
};
module.exports = validate;