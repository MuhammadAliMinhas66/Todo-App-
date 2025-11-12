import express from 'express';
import  bodyparser from "body-parser"
import morgan from 'morgan';
import cors from 'cors';
import ConnectDB from './config/connection.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import todoRoutes from './routes/todo.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1', userRoutes);
app.use('/api/v1', todoRoutes);
// Connect to MongoDB
ConnectDB();

// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  
            


