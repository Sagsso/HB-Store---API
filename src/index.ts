import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection,} from 'typeorm';

import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import saleRoutes from './routes/sale.routes';
import saleDetailRoutes from './routes/saleDetail.routes';
import creditRoutes from './routes/credit.routes';
import payOutRoutes from './routes/payOut.routes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hermosa Bendición - TIENDA DE ACCESORIOS')
})

createConnection();

//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use(userRoutes);
app.use(productRoutes);
app.use(saleRoutes);
app.use(saleDetailRoutes);
app.use(creditRoutes);
app.use(payOutRoutes);

app.listen(port);
console.log('Server on port', port);