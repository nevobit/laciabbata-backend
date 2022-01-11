import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    category : {type: String},
    code : {type: String},
    name : {type: String, unique:true},
    stock : {type: Number},
    buyPrice : {type: Number},
    priceDetal: {type: Number},
    priceMajor: {type: Number},
    
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;