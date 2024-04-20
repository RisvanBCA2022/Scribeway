import express from 'express'
import { deleteuser, getusers, signout, test, updateUser } from '../controllers/userController.js'
import {verifyToken} from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteuser)
router.post('/signout',signout)
router.get('/getusers',verifyToken,getusers)
router.get('/deleteusers/userId',verifyToken, deleteuser)

export default router