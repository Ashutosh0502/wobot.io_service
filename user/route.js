var express = require('express');
var router = express.Router();

var controller = require('./controller');

const authenticator = require('../helper/auth');

router.post('/sign-up', (req, res, next) => { 
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.post('/login', (req, res, next) => {    
    return controller.validate(req.body).then((response) => {
        return res.status(200).json({ data: response });
    }).catch((err) => {
        next(err);
    });
});

router.get('/getUserList', (req, res, next) => {
    return controller.getUserList().then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});


router.get('/getUserDetailsById/:id', (req, res, next) =>{
    return controller.getUserDetailsById(req.params.id).then((results) => {
        return res.status(200).json({ data: results });
    }).catch((err) => next(err));
});


module.exports = router;