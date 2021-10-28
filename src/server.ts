import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

import './database';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => console.log('🚀 Server is running on port 3333'));