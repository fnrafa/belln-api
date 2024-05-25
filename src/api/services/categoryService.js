const categoryModel = require("../models/categoryModel");
const CustomError = require("../../utils/customError");
exports.getCategoryService = async () => {
    const category = await categoryModel.readCategoryHaveItem();
    if (category.length === 0) throw new CustomError("No category found on database", 404);
    return category;
}
exports.getAllCategoryService = async () => {
    const category = await categoryModel.readCategory();
    if (category.length === 0) throw new CustomError("No category found on database", 404);
    return category;
}
exports.addCategoryService = async ({name}) => {
    return await categoryModel.addCategory({name});
}
exports.updateCategoryService = async ({id, name}) => {
    const {deleteAt} = await categoryModel.checkDeleteAt({id});
    if (deleteAt != null) throw new CustomError("This Category already deleted", 409)
    return await categoryModel.updateCategory({id, name});
}
exports.deleteCategoryService = async ({id}) => {
    const {deleteAt} = await categoryModel.checkDeleteAt({id});
    if (deleteAt != null) throw new CustomError("This Category already deleted", 409)
    return await categoryModel.deleteCategory({id});
}