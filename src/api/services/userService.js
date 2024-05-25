const CustomError = require("../../utils/customError");
const userModel = require("../models/userModel");
exports.getAllUserService = async () => {
    const user = await userModel.readUser();
    if (user.length === 0) throw new CustomError("No users found in the database", 404);
    return user;
}
