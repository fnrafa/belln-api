const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.readOrder = async (userId) => {
    try {
        return await prisma.order.findMany({
            where: {deletedAt: null, userId}, orderBy: {createdAt: 'desc'}, include: {
                user: true, address: true, payment: true, orderItems: {
                    include: {
                        itemType: true
                    }
                }
            }
        });
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.readAllOrder = async () => {
    try {
        return await prisma.order.findMany({
            where: {deletedAt: null}, orderBy: {createdAt: 'desc'}, include: {
                user: true, address: true, payment: true, orderItems: {
                    include: {
                        itemType: true
                    }
                }
            }
        });
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.addOrder = async (userId, addressId, delivered, orderItems) => {
    try {
        return await prisma.order.create({
            data: {
                userId, addressId, delivered, orderItems: {
                    create: orderItems.map(item => ({
                        itemTypeId: item.itemTypeId, quantity: item.quantity
                    }))
                }
            }
        });
    } catch (error) {
        if (error.code === 'P2003') throw new CustomError("Conflict happen, check your product are available", 409)
        throw new CustomError(error.message)
    }
}
exports.updateStatus = async (id, status) => {
    try {
        return await prisma.order.update({
            where: {
                id
            }, data: {
                status
            }
        });
    } catch (error) {
        throw new CustomError(error.message)
    }
}
exports.getDetailOrder = async (id) => {
    try {
        return await prisma.order.findUniqueOrThrow({
            where: {id}, include: {
                user: true, address: true, payment: true, orderItems: {
                    include: {
                        itemType: true
                    }
                }
            }
        })
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Order not found", 404);
        throw new CustomError(error.message);
    }
}