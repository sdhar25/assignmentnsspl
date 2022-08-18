const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required: true,
        trim: true,
        unique:true,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    tagSpecial:{
        type:Boolean
    },
    rating:{
        type:Number
    },
    tagging:[{
         year: {
            type:Number
        }, 
         tagId: {
            type:Number
        } }]
})


const Product = mongoose.model('Product',productSchema);
module.exports = Product;
