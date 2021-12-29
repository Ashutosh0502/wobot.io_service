const dbHelper = require('./dbHelper');
const product = {};

product.UploadExcel = async (req) => {
    try {
        await dbHelper.ReadExcel(req);
    } catch (err) {
        return Promise.reject(err);
    }
}


product.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = product;