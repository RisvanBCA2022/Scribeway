import express from 'express'
import { createComment, deletecomment, editcomment, getpostcomments, likecomment } from '../controllers/commentController.js'
import {verifyToken} from '../utils/verifyUser.js'


const router = express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getpostcomments/:postId',getpostcomments)
router.put('/likecomment/:commentId',verifyToken,likecomment)
router.put('/editcomment/:commentId',verifyToken,editcomment)
router.delete('/deletecomment/:commentId',verifyToken,deletecomment)


export default router