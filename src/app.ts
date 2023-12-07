import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/NotFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
