const validate = require("../validate");
const authValidate = {
    Login: validate(['username', 'password']),
    Register: validate(['fullname', 'username', 'email', 'phone', 'password', 'repeat_password']),
    Verify: validate(['code'])
}
module.exports = authValidate;