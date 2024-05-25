const authorize = require("../middlewares/authorize");
const userValidate = require("../utils/validations/userValidator");
const address = require("../api/controllers/addressController");
const order = require("../api/controllers/orderController");
const notify = require("../api/controllers/notifyController");
const router = require('express').Router();

router.get('/address', authorize(['user', 'admin']), address.getAddress);
router.post('/address', authorize(['user', 'admin']), userValidate.addAddress, address.addAddress);
router.patch('/address', authorize(['user', 'admin']), userValidate.updateAddress, address.updateAddress);
router.delete('/address', authorize(['user', 'admin']), userValidate.onlyId, address.deleteAddress);

router.get('/order', authorize(['user', 'admin']), order.getOrder);
router.post('/order', authorize(['user', 'admin']), userValidate.addOrder, order.addOrder);
//router.post('/order/checkout', authorize(['user', 'admin']));

router.get('/notify', authorize(['user', 'admin']), notify.getNotification);
router.put('/notify', authorize(['user', 'admin']), userValidate.onlyId, notify.setAsRead);

module.exports = router;