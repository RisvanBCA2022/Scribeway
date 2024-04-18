import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('mongodb connected successfully');
})
.catch((error)=>{
    console.log(error);
})
app.listen(6000, () => {
  console.log("Server is running on 6000");
});
