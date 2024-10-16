import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoute.js'
import commentRoutes from './routes/commentRoutes.js'
import sitmapRoutes from './routes/sitemapRoutes.js'


dotenv.config();
//testing commit 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)
app.use('/',sitmapRoutes)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'client','dist', 'index.html'))
})
// app.get('/', (req,res)=>{
//     res.json({"message":"API is working"})
// });




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});