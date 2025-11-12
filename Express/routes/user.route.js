import express from 'express';
import { getusers, postuser,deleteuser,getuserbyid,updateuser } from '../controllers/user.js';
let router=express.Router();


router.post('/create/users',postuser);
router.get('/get/users',getusers);
router.delete('/delete/user/:id',deleteuser);
router.get('/get/user/:id',getuserbyid);
router.put('/update/user/:id',updateuser);

export default router;  