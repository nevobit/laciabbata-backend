import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name : {type: String, unique:false},
    phone : {type: Number},
    address : {type: String},
    buys : {type: Number, default: 0},
    type : {type: Number, default: 0},
},{
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

export default Client;