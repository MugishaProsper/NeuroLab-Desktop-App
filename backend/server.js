import express from 'express'
import { connectToDatabase } from './config/db.config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import auth_router from './routers/auth.routes.js';


const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', auth_router);
app.get('/api/message', (req, res) => {
  res.json({ message : "Hello from backend" });
  console.log('Message sent');
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  connectToDatabase();
})