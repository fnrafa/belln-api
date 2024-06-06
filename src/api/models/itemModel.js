const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.readItem = async ({category = null, search = null, data = 0}) => {
    try {
        let whereClause = {
            deletedAt: null
        };
        if (category) {
            whereClause.category = {
                name: category, deleteAt: null
            }
        }
        if (search) {
            whereClause.name = {
                contains: search,
            }
        }
        let queryOptions = {
            where: whereClause, select: {
                id: true, name: true, description: true, category: true, itemTypes: true,
            },
        };
        if (data !== 0) queryOptions.take = data;
        let items = await prisma.item.findMany(queryOptions);
        items = await Promise.all(items.map(async (item) => {
            const rates = await prisma.rate.findMany({
                where: {itemId: item.id}, select: {
                    Rate: true
                }
            });
            const averageRate = rates.reduce((acc, curr) => acc + curr.Rate, 0) / rates.length || 0;
            return {
                ...item, averageRate,
            };
        }));
        return items;
    } catch (error) {
        throw new CustomError(error.message)
    }
};
exports.readDetailItem = async ({id}) => {
    try {
        return await prisma.item.findFirstOrThrow({
            where: {id}, include: {itemTypes: {}}
        })
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Item not found", 404);
        throw new CustomError(error.message);
    }
}
exports.addItem = async (name, description, categoryId, type, price, stock, url, refill) => {
    try {
        return await prisma.item.create({
            data: {
                name, description, categoryId, itemTypes: {
                    create: {
                        type, price, stock, url, refill
                    },
                }
            }, include: {
                itemTypes: true
            }
        });
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("Item already exists", 409);
        throw new CustomError(error.message);
    }
}
exports.addItemType = async (itemId, type, price, stock, url, refill) => {
    try {
        return await prisma.itemType.create({
            data: {
                type, price, stock, url, itemId, refill
            }
        });
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("ItemType already exists", 409);
        throw new CustomError(error.message);
    }
}
exports.getItemIsExist = async (id) => {
    try {
        return await prisma.item.findFirstOrThrow({where: {id, deletedAt: null}});
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Item not found", 404);
        throw new CustomError(error.message);
    }
}
exports.updateItem = async (id, name, description) => {
    try {
        return await prisma.item.update({
            where: {id}, data: {name, description},
        });
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("This item name already used", 409);
        throw new CustomError(error.message);
    }
}
exports.updateItemType = async ({id, type, price, stock, url, refill}) => {
    try {
        return await prisma.itemType.update({
            where: {id}, data: {
                type, price, stock, url, refill
            }
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}
exports.addStock = async (id, stock) => {
    try {
        return await prisma.itemType.update({
            where: {id}, data: {
                stock
            }
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}
exports.decrementStock = async (id, value) => {
    try {
        return await prisma.itemType.update({
            where: {id}, data: {
                stock: {
                    decrement: value
                }
            }
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}
exports.deleteItem = async ({id}) => {
    try {
        const {name} = await prisma.item.findUnique({where: {id}});
        const uniqueName = `${name}_${new Date().getTime()}`;
        return await prisma.item.update({
            where: {id}, data: {
                name: uniqueName, deletedAt: new Date()
            },
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
};
exports.getItemTypeIsExist = async (id) => {
    try {
        return await prisma.itemType.findFirstOrThrow({where: {id, deletedAt: null}});
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Item Type not found", 404);
        throw new CustomError(error.message);
    }
}
exports.deleteItemType = async ({id}) => {
    try {
        return await prisma.itemType.update({
            where: {id}, data: {
                deletedAt: new Date()
            },
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
};
