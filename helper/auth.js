const jwt = require('jsonwebtoken');
const users = require('../user/model');

const authService = {};

/*
*validateToken() validates the token(as a bearer token) that has been genetrated 
*during login.
*/
authService.validateToken = async(req, res, next) => {
    const authorizationHeaader = req.headers.authorization;

    let result;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: '1d',
            issuer: process.env.ISSUER
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.JWT_SECRET, options);

            users.findOne({ token }).exec().then((u) => {
                if(u){
                    req.decoded = result;
                    next();
                } else{
                    res.status(401).send({ message: 'token expire' });
                }
            });
        } catch (err) {
            res.status(401).send({ message: 'token expire' });
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        res.status(401).send(result);
    }
}

authService.mergeUserInfoWithRes = (data, req) => {
    if(req.decoded){
        const {userName, roleId} = decoded;
        return {data, userName, roleId};
    }
    return {data};
    
}

module.exports = authService;