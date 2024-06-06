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
            case 402:
                return response.PaymentRequired(res, error.message);
            case 403:
                return response.Forbidden(res, error.message);
            case 404:
                return response.NotFound(res, error.message);
            case 405:
                return response.MethodNotAllowed(res, error.message);
            case 406:
                return response.NotAcceptable(res, error.message);
            case 407:
                return response.ProxyAuthenticationRequired(res, error.message);
            case 408:
                return response.RequestTimeout(res, error.message);
            case 409:
                return response.Conflict(res, error.message);
            case 410:
                return response.Gone(res, error.message);
            case 411:
                return response.LengthRequired(res, error.message);
            case 412:
                return response.PreconditionFailed(res, error.message);
            case 413:
                return response.PayloadTooLarge(res, error.message);
            case 414:
                return response.URITooLong(res, error.message);
            case 415:
                return response.UnsupportedMediaType(res, error.message);
            case 416:
                return response.RangeNotSatisfiable(res, error.message);
            case 417:
                return response.ExpectationFailed(res, error.message);
            case 418:
                return response.ImATeapot(res, error.message);
            case 421:
                return response.MisdirectedRequest(res, error.message);
            case 422:
                return response.UnprocessableEntity(res, error.message);
            case 423:
                return response.Locked(res, error.message);
            case 424:
                return response.FailedDependency(res, error.message);
            case 425:
                return response.TooEarly(res, error.message);
            case 426:
                return response.UpgradeRequired(res, error.message);
            case 428:
                return response.PreconditionRequired(res, error.message);
            case 429:
                return response.TooManyRequests(res, error.message);
            case 431:
                return response.RequestHeaderFieldsTooLarge(res, error.message);
            case 451:
                return response.UnavailableForLegalReasons(res, error.message);
            case 500:
                return response.InternalServerError(res, error.message);
            case 501:
                return response.NotImplemented(res, error.message);
            case 502:
                return response.BadGateway(res, error.message);
            case 503:
                return response.ServiceUnavailable(res, error.message);
            case 504:
                return response.GatewayTimeout(res, error.message);
            case 505:
                return response.HTTPVersionNotSupported(res, error.message);
            case 506:
                return response.VariantAlsoNegotiates(res, error.message);
            case 507:
                return response.InsufficientStorage(res, error.message);
            case 508:
                return response.LoopDetected(res, error.message);
            case 510:
                return response.NotExtended(res, error.message);
            case 511:
                return response.NetworkAuthenticationRequired(res, error.message);
            default:
                return response.InternalServerError(res, error.message);
        }
    } else {
        return response.InternalServerError(res, error.message);
    }
};
module.exports = errorHandler;