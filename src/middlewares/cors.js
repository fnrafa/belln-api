const cors = require('cors');
const response = require('../utils/responses')
const allowedOrigins = '*';
const corsOptions = {
    origin: allowedOrigins,
    methods: 'HEAD,GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.corsMiddleware = (app) => {
    app.use(cors(corsOptions));
    app.use((err, req, res, next) => {
        if (err instanceof Error) {
            if (err.message.includes('Not allowed by CORS')) return response.Forbidden(res, err.message);
            return response.InternalServerError(res);
        }
        next();
    });
}