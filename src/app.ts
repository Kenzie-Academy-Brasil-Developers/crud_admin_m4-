import 'express-async-errors';
import express, { Application, json } from 'express';
import { loginRouter, userRouter } from './routes/userAndLogin.router';
import { handleErrors } from './error';

const app: Application = express();
app.use(json());

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.use(handleErrors);

export default app;
