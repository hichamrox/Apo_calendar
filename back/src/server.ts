import express, { Request, Response } from 'express';
import staffRoutes from './routes/staff';
import appointmentRoutes from './routes/appointment';
import clientRoutes from './routes/client';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use('/staffs', staffRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/clients', clientRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});  