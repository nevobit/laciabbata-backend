import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    name : {type: String},
    value : {type: Number},
},{
    timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;