const item = require("../api/controllers/itemController");
const category = require("../api/controllers/categoryController")
const router = require('express').Router();

router.get('/category', category.getCategory);
router.get('/item', item.getItem);

module.exports = router;