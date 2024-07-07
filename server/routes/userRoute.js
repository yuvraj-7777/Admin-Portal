import express from  'express';
import { deleteUser, getAllUser, AddUser ,EditUser} from '../controllers/userController.js';
import {isAdmin} from '../middleware/verifyToken.js';



const  userRoute = express.Router();

userRoute.get('/getAllUser',isAdmin,getAllUser)
userRoute.delete('/delete/:id',isAdmin,deleteUser)
userRoute.post('/addUser',isAdmin,AddUser)
userRoute.put('/editUser',EditUser)


export default userRoute;
