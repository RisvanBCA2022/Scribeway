import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createpost } from '../controllers/postController.js'

const router=express.Router()

router.post('/create',verifyToken,createpost)

export default router