import mongoose from 'mongoose';

const sellSchema = new mongoose.Schema({
    code : {type: Number, unique:true},
    cliente: {type: String},
    items: [
        {
            name: {type: String},
            qty: {type:Number},
            price: {type: Number},
            product: {type: mongoose.Schema.Types.String, ref: 'Product',}
        }
    ],
    paymentMethod: {type: String,},
    itemsPrice: {type: Number,},

},{
    timestamps: true
});

const Sell = mongoose.model('Sell', sellSchema);

export default Sell;