import express from 'express'
import { checkRole, verifyToken } from '../utils/verifyUser.js'
import { createpost, deletepost, getposts, updatepost } from '../controllers/postController.js'

const router=express.Router()

router.post('/create',verifyToken,checkRole('admin'),createpost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,checkRole('admin'),deletepost)
router.put('/updatepost/:postId/:userId',verifyToken,checkRole('admin'),updatepost)

export default router