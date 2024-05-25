const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.readUserAddress = async (userId) => {
    try {
        const {id} = await prisma.user.findFirstOrThrow({where: {deletedAt: null, id: userId}});
        return await prisma.address.findMany({where: {deletedAt: null, userId: id}});
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("User not found", 404);
        throw new CustomError(error.message)
    }
}
exports.addAddress = async (userId, address, city, zipCode, country) => {
    try {
        await prisma.address.create({data: {userId, address, city, zipCode, country}});
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.getAddress = async (id) => {
    try {
        return await prisma.address.findFirstOrThrow({where: {deletedAt: null, id}});
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Address not found", 404);
        throw new CustomError(error.message)
    }
}
exports.updateAddress = async ({id, address, city, zipCode, country}) => {
    try {
        return await prisma.address.update({
            where: {id}, data: {
                address, city, zipCode, country
            }
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}
exports.deleteAddress = async ({id}) => {
    try {
        return await prisma.address.update({
            where: {id}, data: {
                deletedAt: new Date()
            }
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}