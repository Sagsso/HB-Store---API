import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createConnection,} from 'typeorm';

import userRoutes from './routes/user.routes';

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

app.listen(port);
console.log('Server on port', port);