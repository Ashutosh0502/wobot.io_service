import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    name: {        
        type: String,
        required: true
    },
    description: {        
        type: String,
        required: true
    },
    price: {     
        type: String,
        required: true
    },
    quantity: {        
        type: Number,
        required: true
    },
    // userId: {         
    //     type: String,
    //     required: true
    // },

    createdDate: {      
        type: Date,
        default: Date.now
    }
});

// export default 
module.exports = model("product", productSchema);
