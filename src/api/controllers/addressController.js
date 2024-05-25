const service = require("../services/addressService");
const response = require("../../utils/responses");
const errorHandler = require("../../utils/errorHandler");
exports.getUserAddress = async (req, res) => {
    try {
        const {id} = req.params;
        const address = await service.getUserAddressService({id});
        response.Success(res, 'Read user address success', address);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.getAddress = async (req, res) => {
    try {
        const {id} = req.user;
        const data = await service.getUserAddressService({id});
        response.Success(res, 'Read user address success', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.addAddress = async (req, res) => {
    try {
        const {id} = req.user;
        const {address, city, zipCode, country} = req.body;
        const data = await service.addAddressService(id, address, city, zipCode, country);
        response.Created(res, 'Create user address success', data);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id, address, city, zipCode, country} = req.body;
        await service.updateAddressService(userId, id, address, city, zipCode, country);
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.body;
        await service.deleteAddressService(userId, id);
        response.NoContent(res);
    } catch (error) {
        errorHandler(req, res, error);
    }
}
