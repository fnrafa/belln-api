const service = require("../services/categoryService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getCategory = async (req, res) => {
    try {
        const category = await service.getCategoryService()
        response.Success(res, 'Read category success', category);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.getAllCategory = async (req, res) => {
    try {
        const category = await service.getAllCategoryService();
        response.Success(res, 'Read all category success', category);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addCategory = async (req, res) => {
    try {
        const {name} = req.body;
        const category = await service.addCategoryService({name});
        response.Created(res, 'Create category success', category);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const {id, name} = req.body;
        await service.updateCategoryService({id, name});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const {id} = req.body;
        await service.deleteCategoryService({id});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}