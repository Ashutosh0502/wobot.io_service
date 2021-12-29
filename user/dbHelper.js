const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = require('./model');

const usersDbHelper = {};

usersDbHelper.save = async (usersInput) => {
    try {
        return users.countDocuments({ username: usersInput.username }).then((count) => {
            if (count === 0) {
                usersInput.password = usersInput.password ;
                return bcrypt.hash(usersInput.password, saltRounds).then((encryptedPassword) => {
                    let newUser = JSON.parse(JSON.stringify(usersInput));
                    newUser.password = encryptedPassword;

                    const obj = new users(newUser);
                    return obj.save().then(() => { return obj; });
                });

            } else {
                return 'user exist';
            }
        });

    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.getUserList = async () => {
    try {
        return users.find({})
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return {
                        firstname: result.firstname,
                        lastname: result.lastname,
                        username: result.username
                    }
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.getUserDetailsById = async (id) => {
    try {
        return await users.find({_id: id})
            .exec()
            .then((results) => {
                return results.length === 1 ? results[0] : null;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.validate = async (model) => {
    try {
        return users.findOne({ username: model.username}).exec().then((u) => {
            if (u) {
                const payload = { userName: u.firstname, 
                    id:u._id,lastname:u.lastname,
                    username:u.username };
                const options = { expiresIn: '1d', issuer: process.env.ISSUER };

                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);


                const match = bcrypt.compareSync(model.password, u.password);
                if(match){
                   return u.updateOne({token}).then(()=>{
                       
                        return { match, token, payload };
                    });
                }
                return {match};
            }

            return Promise.reject("user not exist");
        });

    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = usersDbHelper;