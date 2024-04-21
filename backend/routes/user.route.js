import express from 'express'
import { deleteuser, getuser, getusers, signout, test, updateUser } from '../controllers/userController.js'
import {verifyToken} from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteuser)
router.post('/signout',signout)
router.get('/getusers',verifyToken,getusers)
router.get('/deleteusers/userId',verifyToken, deleteuser)
router.get('/:userId',getuser)
export default router