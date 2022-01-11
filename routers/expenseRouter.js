import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Expense from '../models/expenseModel.js';

const expenseRouter = express.Router();

expenseRouter.get('/', expressAsyncHandler( async(req, res) => {
    const expenses = await Expense.find({});
    res.send(expenses);
}));

expenseRouter.post('/create', expressAsyncHandler( async(req, res) => {
    console.log(req.body.value)
    const expense = await Expense({name:req.body.name, value: req.body.value});
    const createdExpense = await expense.save();
    console.log(createdExpense);
    res.send({
        _id: createdExpense._id,
        name: createdExpense.name,
        value: createdExpense.value
    });
    
    // res.status(401).send({message: 'Categoria Creada'});
}));

expenseRouter.delete('/:id', expressAsyncHandler( async(req, res) => {
    const expense = await Expense.findById(req.params.id);
    if(expense){
        const deletedExpense = await expense.remove();
        res.send({message: 'Expense Deleted', expense: deletedExpense});
    }else{
        res.status(400).send({message: 'El Gasto no funcion'})
    }
    
    res.send(expense);
}));


export default expenseRouter;