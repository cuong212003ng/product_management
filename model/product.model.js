const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    category:String,
    price:Double,
    discountPercentage:Double,
    rating:Double,
    stock:Number,
    thumbnail:String,
    status:String,
    deleted:Boolean,
    position:Number
});


const Product = mongoose.model('Product', productSchema, 'products');


module.exports = Product;
