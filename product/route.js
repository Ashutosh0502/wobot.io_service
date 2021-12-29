var express = require('express');

var router = express.Router();
var controller = require('./controller');
import upload from '../helper/upload';
const authenticator = require('../helper/auth');

router.post('/UploadExcel',upload.saveImage,authenticator.validateToken,(req, res, next) => { 
    return controller.UploadExcel(req)
            .then((success) => res.status(200).send('File is saved'))
            .catch((err) => next(err));
});

router.get('/getProductList',authenticator.validateToken,(req, res, next) => {
    return controller.getAll().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});

module.exports = router;