import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {        
        type: String,
        required: true
    },
    firstname: {        
        type: String,
        required: true
    },
    password: {     
        type: String,
        required: true
    },
    lastname: {        
        type: String,
        required: true
    },

    token: {        
        type: String
    },
    createdDate: {      
        type: Date,
        default: Date.now
    }
});

// export default 
module.exports = model("user", userSchema);
