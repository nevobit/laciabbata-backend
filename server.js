import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routers/userRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import productRouter from './routers/productRouter.js';
import clientRouter from './routers/clientRouter.js';
import sellRouter from './routers/sellRouter.js';
import expenseRouter from './routers/expenseRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://adminlc:12345@cluster0.pcisi.mongodb.net/laciabbata?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/clients', clientRouter);
app.use('/api/sells', sellRouter);
app.use('/api/expenses', expenseRouter);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')))

app.get('/', (req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
