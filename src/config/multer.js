const multer = require('multer');
const config = require("./config");
const crypto = require("crypto");
const path = require('path');
const {unlink} = require("fs");
const response = require("../utils/responses");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const projectDir = path.resolve(__dirname, '../..');
            const uploadPath = config.tempPath ? path.join(projectDir, config.tempPath) : path.join(projectDir, 'public', 'data');
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 // 1 MB
    }
}).single('image');

const uploadPromise = (req, res) => new Promise((resolve, reject) => {
    upload(req, res, (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});
const setImageUrl = (req, res, next) => {
    if (req.file) {
        req.body.image = `${req.file.destination}/${req.file.filename}`;
        setTimeout(() => {
            unlink(`${req.file.destination}/${req.file.filename}`, () => {
            });
        }, 10000);
    }
    next();
};
const prepareMulter = async (req, res, next) => {
    try {
        await uploadPromise(req, res);
        await setImageUrl(req, res, next);
    } catch (error) {
        response.InternalServerError(res, error.message);
    }
};
module.exports = prepareMulter;


