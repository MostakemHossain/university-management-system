import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/models/user/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
