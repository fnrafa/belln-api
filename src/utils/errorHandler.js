const response = require('./responses');
const CustomError = require("./customError");
const errorHandler = (req, res, error) => {
    if (error instanceof CustomError) {
        switch (error.statusCode) {
            case 200:
                return response.Success(res, error.message);
            case 400:
                return response.BadRequest(res, error.message);
            case 401:
                return response.Unauthorized(res, error.message);
            case 403:
                return response.Forbidden(res, error.message);
            case 404:
                return response.NotFound(res, error.message);
            case 409:
                return response.Conflict(res, error.message);
            case 422:
                return response.UnprocessableEntity(res, error.message);
            case 503:
                return response.ServiceUnavailable(res, error.message);
            default:
                return response.InternalServerError(res, error.message);
        }
    } else {
        return response.InternalServerError(res, error.message);
    }
};
module.exports = errorHandler;