const product = require('./model');
const _ = require('lodash');
const productDbHelper = {};
const xlsxFile = require('read-excel-file/node');




productDbHelper.ReadExcel = async (req) => {
    try {
        
        const files = req.files;
        const userId = req.decoded.userId;
        
        const fileP  = `${process.env.imageStoragePath}/${files[0].originalname}`;
        const rows = await getxmlRows(fileP);

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            const obj = {
                name: row[0],
                description: row[1],
                quantity: row[2],
                price: row[3],
                userId : userId
            };
            const productModel = new product(obj);
            await productModel.save();
        }

    }

    catch (error) {
        console.log('error', error);
        throw new Error(error);
    }

}

const getxmlRows = async (fileP) => {
    return xlsxFile(fileP).then((rows) => {
        return rows;
    });
}



productDbHelper.getAll = async () => {
    try {
        return product.find({})
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return result;
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = productDbHelper;