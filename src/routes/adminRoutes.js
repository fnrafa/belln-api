const router = require('express').Router();
const adminValidate = require("../utils/validations/adminValidator");
const user = require('../api/controllers/userController');
const category = require('../api/controllers/categoryController');
const item = require("../api/controllers/itemController");
const address = require("../api/controllers/addressController");
const order = require("../api/controllers/orderController");
const authorize = require("../middlewares/authorize");
const prepareMulter = require("../config/multer");

router.get('/user', authorize(['admin']), user.getAllUser);
router.get('/user/address/:id', authorize(['admin']), address.getUserAddress);

router.get('/category', authorize(['admin']), category.getAllCategory);
router.post('/category', authorize(['admin']), adminValidate.addCategory, category.addCategory);
router.patch('/category', authorize(['admin']), adminValidate.updateCategory, category.updateCategory);
router.delete('/category', authorize(['admin']), adminValidate.onlyId, category.deleteCategory);

router.get('/item', authorize(['admin']), item.getAllItem);
router.get('/item/detail/:id', authorize(['admin']), item.getDetailItem);
router.post('/item', authorize(['admin']), prepareMulter, adminValidate.addItem, item.addItem);
router.post('/item/type', authorize(['admin']), prepareMulter, adminValidate.addItemType, item.addItemType);
router.patch('/item', authorize(['admin']), adminValidate.updateItem, item.updateItem);
router.patch('/item/type', authorize(['admin']), prepareMulter, adminValidate.updateItemType, item.updateItemType);
router.put('/item/type', authorize(['admin']), adminValidate.addStock, item.addStock);
router.delete('/item', authorize(['admin']), adminValidate.onlyId, item.deleteItem);
router.delete('/item/type', authorize(['admin']), adminValidate.onlyId, item.deleteItemType);

router.get('/order', authorize(['admin']), order.getAllOrder);
router.put('/order', authorize(['admin']), adminValidate.updateStatus, order.updateStatus);

module.exports = router;