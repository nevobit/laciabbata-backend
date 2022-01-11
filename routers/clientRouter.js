import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';

const clientRouter = express.Router();

clientRouter.get('/', expressAsyncHandler( async(req, res) => {
    const clients = await Client.find({});
    res.send(clients);
}));

clientRouter.post('/create', expressAsyncHandler( async(req, res) => {
    const client = await Client({name:req.body.name,
        phone:req.body.phone,
        address:req.body.address,
        type:req.body.type,
    });
    const createdClient = await client.save();
    console.log(createdClient);
    res.send({
        _id: createdClient._id,
        name: createdClient.name,
        address: createdClient.address,
        phone: createdClient.phone,
        type: createdClient.type,
    });
    
    // res.status(401).send({message: 'Categoria Creada'});
}));

clientRouter.delete('/:id', expressAsyncHandler( async(req, res) => {
    const client = await Client.findById(req.params.id);
    if(client){
        const deletedClient = await client.remove();
        res.send({message: 'User Deleted', client: deletedClient});
    }else{
        res.status(400).send({message: 'El Usuario no funcion'})
    }
    
    res.send(client);
}));


export default clientRouter;