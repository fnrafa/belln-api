const validate = require("../validate");
const adminValidate = {
    addCategory: validate(['name']),
    addItem: validate(['name', 'description', 'category', 'type', 'price', 'stock', 'image', 'refill']),
    addItemType: validate(['id', 'type', 'price', 'stock', 'image', 'refill']),
    addStock: validate(['id', 'stock']),
    onlyId: validate(['id']),
    updateCategory: validate(['id', 'name']),
    updateItem: validate(['id', 'name', 'description']),
    updateItemType: validate(['id', 'type', 'price', 'stock', 'image', 'refill']),
    updateStatus: validate(['id', 'status'])
}
module.exports = adminValidate;