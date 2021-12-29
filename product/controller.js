const dbHelper = require('./dbHelper');
const product = {};

product.UploadExcel = async (req) => {
    try {
        await dbHelper.ReadExcel(req.body,req.files);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = product;