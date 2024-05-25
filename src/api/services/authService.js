const CustomError = require("../../utils/customError");
const { hash, compare } = require("bcryptjs");
const userModel = require("../models/userModel");
const getToken = require("../../utils/jwtToken");
exports.loginService = async (user, pass) => {
    const {id, email, username, password, verified, fullname} = await userModel.findUser(user);
    if (!(await compare(pass, password))) throw new CustomError('Wrong Password', 401);
    const token = await getToken(id);
    return {id, fullname, email, username, verified, token};
}
exports.registerService = async (mail, user, pass, name) => {
    const hashedPassword = await hash(pass, 10);
    const {
        id, email, username, verified, fullname
    } = await userModel.createUser(mail, user, hashedPassword, name);
    const token = await getToken(id);
    return {id, fullname, email, username, verified, token};
}