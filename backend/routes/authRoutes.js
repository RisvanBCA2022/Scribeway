import express from 'express';
import { signup } from '../controllers/authController.js';

const router = express.Router();


router.post('/signup',(req,res)=>{
res.json("working")
} );

export default router;