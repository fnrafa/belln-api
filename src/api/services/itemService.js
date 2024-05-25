const itemModel = require("../models/itemModel");
const categoryModel = require("../models/categoryModel");
const CustomError = require("../../utils/customError");
const {storeImage} = require("../../utils/storeImage");
exports.getItemService = async ({category, search}) => {
    const data = 10;
    const item = await itemModel.readItem({category, search, data});
    if (item.length === 0) throw new CustomError("No item found on database", 404);
    return item;
}
exports.getAllItemService = async ({category, search}) => {
    const item = await itemModel.readItem({category, search});
    if (item.length === 0) throw new CustomError("No item found on database", 404);
    return item;
}
exports.getDetailItemService = async ({id}) => {
    return await itemModel.readDetailItem({id});
}
exports.addItemService = async (name, description, category, type, price, stock, image, refill) => {
    const {id} = await categoryModel.getIdCategoryOrAddNew(category);
    const url = await storeImage(image);
    return itemModel.addItem(name, description, id, type, price, stock, url, refill);
}
exports.addItemTypeService = async (itemId, type, price, stock, image, refill) => {
    const {id} = await itemModel.getItemIsExist(itemId);
    const url = await storeImage(image);
    return itemModel.addItemType(id, type, price, stock, url, refill);
}
exports.updateItemService = async (id, name, description) => {
    await itemModel.getItemIsExist(id);
    return await itemModel.updateItem(id, name, description);
}
exports.updateItemTypeService = async ({id, type, price, stock, image, refill}) => {
    await itemModel.getItemTypeIsExist(id);
    const url = await storeImage(image);
    return await itemModel.updateItemType({id, type, price, stock, url, refill});
}
exports.deleteItemService = async ({id}) => {
    await itemModel.getItemIsExist(id);
    return await itemModel.deleteItem({id});
}
exports.deleteItemTypeService = async ({id}) => {
    await itemModel.getItemTypeIsExist(id);
    return await itemModel.deleteItemType({id});
}
exports.addStock = async (id, stock) => {
    await itemModel.getItemTypeIsExist(id);
    return await itemModel.addStock(id, stock);
}