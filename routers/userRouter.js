import express from 'express';
import expressAsyncHandler from 'express-async-handler';
// import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler( async(req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.get('/', expressAsyncHandler( async(req, res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.post('/signin', expressAsyncHandler( async(req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(user){
        if(req.body.password === user.password){
            res.send({
                _id: user._id,
                name: user.name,
                username: user.username,
                isAdmin: user.isAdmin,
                token:generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Usuario o contraseña invalidos'});
}));

userRouter.post('/register', expressAsyncHandler( async(req, res) => {
    const user = await User({name: req.body.name, username: req.body.username,password: req.body.password});
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        username: createdUser.username,
        isAdmin: createdUser.isAdmin,
        token:generateToken(createdUser),
    });
    
    res.status(401).send({message: 'Usuario o contraseña invalidos'});
}));

userRouter.delete('/:id', expressAsyncHandler( async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        const deletedUser = await user.remove();
        res.send({message: 'User Deleted', user: deletedUser});
    }else{
        res.status(400).semd({message: 'El Usuario no funcion'})
    }
    
    res.send(users);
}));


export default userRouter;