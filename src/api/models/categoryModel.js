const {prisma} = require("../../config/prisma");
const CustomError = require("../../utils/customError");
exports.readCategory = async () => {
    return prisma.category.findMany({
        where: {deleteAt: null}, select: {id: true, name: true}
    });
};
exports.readCategoryHaveItem = async () => {
    return prisma.category.findMany({
        where: {
            deleteAt: null, Item: {some: {deletedAt: null}}
        }, select: {id: true, name: true}
    });
};
exports.addCategory = async ({name}) => {
    try {
        return await prisma.category.create({data: {name},});
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("Category already exists", 409);
        throw new CustomError(error.message);
    }
};
exports.getIdCategoryOrAddNew = async (name) => {
    try {
        return {id} = await prisma.category.upsert({
            where: {name},
            update: {},
            create: {name},
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
}
exports.updateCategory = async ({id, name}) => {
    try {
        return await prisma.category.update({
            where: {id}, data: {name},
        });
    } catch (error) {
        if (error.code === 'P2002') throw new CustomError("This category name already used", 409);
        throw new CustomError(error.message);
    }
};
exports.deleteCategory = async ({id}) => {
    try {
        const {name} = await prisma.category.findUnique({where: {id}});
        const uniqueName = `${name}_${new Date().getTime()}`;
        return await prisma.category.update({
            where: {id}, data: {
                name: uniqueName, deleteAt: new Date()
            },
        });
    } catch (error) {
        throw new CustomError(error.message);
    }
};
exports.checkDeleteAt = async ({id}) => {
    try {
        return await prisma.category.findFirstOrThrow({where: {id}});
    } catch (error) {
        if (error.code === 'P2025' || error.code === 'P2016') throw new CustomError("Category not found", 404);
        throw new CustomError(error.message);
    }
};