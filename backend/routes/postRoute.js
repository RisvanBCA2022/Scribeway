import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createpost, deletepost, getposts } from '../controllers/postController.js'

const router=express.Router()

router.post('/create',verifyToken,createpost)
router.get('/getposts', getposts)
router.post('/deletepost/:postId/:userId',verifyToken,deletepost)

export default router