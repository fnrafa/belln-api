const path = require('path');
const fs = require('fs').promises;
const CustomError = require("./customError");
exports.storeImage = async (image) => {
    try {
        const fileName = path.basename(image);
        const extension = path.extname(image).toLowerCase();
        const currentDir = path.resolve(__dirname);
        const imageUrl = path.join(currentDir, "../../public/data/", fileName);
        const imagePath = path.join(currentDir, "../../public/images/", fileName);
        if (['.jpg', '.jpeg', '.png', '.svg'].includes(extension)) {
            await fs.rename(image, imagePath);
            return "images/" + fileName;
        } else {
            await fs.unlink(imageUrl);
            throw new CustomError("Unsupported file type. Allowed types are: .jpg, .jpeg, .png, .svg");
        }
    } catch (error) {
        if (error instanceof CustomError) throw new CustomError(error.message, 422);
        throw new CustomError(error.message, 422);
    }
}
