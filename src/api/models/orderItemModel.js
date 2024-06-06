const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.getDetailOrderItem = async (id) => {
    try {
        return await prisma.orderItem.findMany({
            where: {orderId: id},
        })
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Order not found", 404);
        throw new CustomError(error.message);
    }
}