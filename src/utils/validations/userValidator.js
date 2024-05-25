const validate = require("../validate");
const userValidate = {
    addAddress: validate(['address', 'city', 'zipCode', 'country']),
    addOrder: validate(['addressId', 'orderItems', 'delivered']),
    onlyId: validate(['id']),
    updateAddress: validate(['id', 'address', 'city', 'zipCode', 'country'])
}
module.exports = userValidate;