const service = require("../services/itemService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getItem = async (req, res) => {
    try {
        const {category, search} = req.query;
        const item = await service.getItemService({category, search});
        response.Success(res, 'Read item success', item);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.getAllItem = async (req, res) => {
    try {
        const {category, search} = req.query;
        const item = await service.getAllItemService({category, search});
        response.Success(res, 'Read all item success', item);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.getDetailItem = async (req, res) => {
    try {
        const {id} = req.params;
        const item = await service.getDetailItemService({id});
        response.Success(res, 'Read detail item success', item);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addItem = async (req, res) => {
    try {
        const {name, description, category, type, price, stock, image, refill} = req.body;
        const priceFloat = parseFloat(price);
        const stockInt = parseInt(stock);
        const refillBool = refill === "true";
        const item = await service.addItemService(name, description, category, type, priceFloat, stockInt, image, refillBool);
        response.Created(res, 'Add new Item Success', item);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addItemType = async (req, res) => {
    try {
        const {id, type, price, stock, image, refill} = req.body;
        const priceFloat = parseFloat(price);
        const stockInt = parseInt(stock);
        const refillBool = refill === "true";
        const item = await service.addItemTypeService(id, type, priceFloat, stockInt, image, refillBool);
        response.Created(res, 'Add new Item Type Success', item);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.updateItem = async (req, res) => {
    try {
        const {id, name, description} = req.body;
        await service.updateItemService({id, name, description});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.updateItemType = async (req, res) => {
    try {
        const {id, type, price, stock, image, refill} = req.body;
        await service.updateItemTypeService({id, type, price, stock, image, refill});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.deleteItem = async (req, res) => {
    try {
        const {id} = req.body;
        await service.deleteItemService({id});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.deleteItemType = async (req, res) => {
    try {
        const {id} = req.body;
        await service.deleteItemTypeService({id});
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addStock = async (req, res) => {
    try {
        const {id, stock} = req.body;
        await service.addStock(id, stock);
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}