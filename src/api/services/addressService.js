const addressModel = require("../models/addressModel");
const CustomError = require("../../utils/customError");
exports.getUserAddressService = async ({id}) => {
    const address = await addressModel.readUserAddress(id);
    if (address.length === 0) throw new CustomError("No address saved to related user", 404);
    return address;
}
exports.addAddressService = async (id, address, city, zipCode, country) => {
    return await addressModel.addAddress(id, address, city, zipCode, country);
}
exports.updateAddressService = async (userIdParam, id, address, city, zipCode, country) => {
    const {userId} = await addressModel.getAddress(id);
    if (userId !== userIdParam) throw new CustomError("Isn't Your Address", 403);
    return await addressModel.updateAddress({id, address, city, zipCode, country})
}
exports.deleteAddressService = async (userIdParam, id) => {
    const {userId} = await addressModel.getAddress(id);
    if (userId !== userIdParam) throw new CustomError("Isn't Your Address", 403);
    return await addressModel.deleteAddress({id})
}