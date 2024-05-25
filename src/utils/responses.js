const sendResponse = (res, statusCode, message = '', data = null) => {
    let response = {status: statusCode < 300 ? 'success' : 'error', message};
    if (data !== null) response.data = data;
    return statusCode === 204 ? res.status(statusCode).send() : res.status(statusCode).json(response);
};
const response = {
    Success: (res, message = 'Ok', data) => sendResponse(res, 200, message, data),
    Created: (res, message = 'Created', data) => sendResponse(res, 201, message, data),
    Accepted: (res, message = 'Accepted', data) => sendResponse(res, 202, message, data),
    NoContent: (res) => sendResponse(res, 204, 'No Content'),
    BadRequest: (res, message = 'Bad Request') => sendResponse(res, 400, message),
    Unauthorized: (res, message = 'Unauthorized') => sendResponse(res, 401, message),
    Forbidden: (res, message = 'Forbidden') => sendResponse(res, 403, message),
    NotFound: (res, message = 'Not Found') => sendResponse(res, 404, message),
    MethodNotAllowed: (res, message = 'Method Not Allowed') => sendResponse(res, 405, message),
    RequestTimeout: (res, message = 'Request Timeout') => sendResponse(res, 408, message),
    Conflict: (res, message = 'Conflict') => sendResponse(res, 409, message),
    UnprocessableEntity: (res, message = 'Unprocessable Entity') => sendResponse(res, 422, message),
    TooManyRequest: (res, message = 'Too Many Request') => sendResponse(res, 429, message),
    InternalServerError: (res, message = 'Internal Server Error') => sendResponse(res, 500, message),
    ServiceUnavailable: (res, message = 'Service Unavailable') => sendResponse(res, 503, message),
};
module.exports = response;
