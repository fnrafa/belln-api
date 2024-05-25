const router = require('express').Router();
const authValidate = require("../utils/validations/authValidator");
const auth = require('../api/controllers/authController');

router.post('/register', authValidate.Register, auth.register);
router.post('/login', authValidate.Login, auth.login);

module.exports = router;