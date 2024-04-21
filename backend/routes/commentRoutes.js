import express from 'express'
import { createComment, getpostcomments } from '../controllers/commentController.js'
import {verifyToken} from '../utils/verifyUser.js'


const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getpostcomments/:postId',getpostcomments)

export default router