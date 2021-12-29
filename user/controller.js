const dbHelper = require('./dbHelper');

const users = {};

users.add = async (req) => {
    try {
        const res = await dbHelper.save(req.body);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}

users.getUserList = async () => {
    try {
        return await dbHelper.getUserList();
    } catch (err) {
        return Promise.reject(err);
    }
}


users.getUserDetailsById = async (id) => {
    try {
        return await dbHelper.getUserDetailsById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


users.validate = async (model) => {
    try {
        return await dbHelper.validate(model);
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = users;