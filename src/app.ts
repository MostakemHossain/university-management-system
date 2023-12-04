import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/models/student/student.route';
const app: Application = express()


//parsers
app.use(express.json())
app.use(cors());

app.use("/api/v1/students",StudentRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
