import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Sell from '../models/sellModel.js';


const sellRouter = express.Router();

sellRouter.get('/list', expressAsyncHandler( async(req, res) => {
    
    const sells = await Sell.find({});
    res.send(sells);
}));

sellRouter.post('/', expressAsyncHandler(async (req, res) => {
    if(req.body.items.length === 0){
        res.status(400).send({message: 'No hay factura'});
    }else{
        const sell = new Sell({
            code: req.body.code,
            cliente: req.body.cliente,
            items: req.body.items,
            paymentMethod: req.body.paymentMethod,
            itemsPrice : req.body.itemsPrice,
        });
        const createdSell = await  sell.save();
        res.status(201).send({message: 'New Sell Created', sell: createdSell});
    }  
}));



export default sellRouter;