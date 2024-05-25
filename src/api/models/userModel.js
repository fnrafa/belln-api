const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.readUser = async () => {
    try {
        return await prisma.user.findMany({where: {deletedAt: null, roleId: "1"}});
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.createUser = async (email, username, password, fullname, roleId = "1") => {
    try {
        return await prisma.user.create({
            data: {
                email, username, password, fullname, roleId
            },
        });
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("Username already exists", 409);
        else throw new CustomError(error.message);
    }
};
exports.findUser = async (username) => {
    try {
        return await prisma.user.findFirstOrThrow({
            where: {
                username
            },
        });
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Username not found", 404);
        throw new CustomError(error.message);
    }
}
exports.findRoleById = async (id) => {
    try {
        return await prisma.user.findFirstOrThrow({
            where: {id}, include: {role: true}
        });
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Invalid token", 401);
        throw new CustomError(error.message)
    }
}