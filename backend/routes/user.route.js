import express from 'express'
import { deleteuser, getuser, getusers, revertToUser, setUserAsAdmin, signout, test, updateUser } from '../controllers/userController.js'
import {checkRole, checkSuperAdmin, verifyToken} from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test',test)
router.put('/update/:userId',checkRole('admin','user'),verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,checkSuperAdmin,deleteuser)
router.post('/signout',signout)
router.get('/getusers',verifyToken,verifyToken,checkRole('admin'),getusers)
router.get('/deleteusers/userId',verifyToken,checkSuperAdmin, deleteuser)
router.get('/:userId',getuser)
router.put('/setadmin/:userId', verifyToken, setUserAsAdmin);
router.put('/reverttouser/:userId', verifyToken, revertToUser);

export default router