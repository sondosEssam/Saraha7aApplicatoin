import  Router  from "express";
import * as user from './user.controller.js'

import { isAuth } from "../../middlewhere/auth.js";

const userRouter = Router();







userRouter.post('/signup',user.signUp);
userRouter.post('/login',user.logIn);
userRouter.get('/get',isAuth(),user.getUser);
userRouter.patch('/update',isAuth(),user.updateUser);
userRouter.delete('/delete',isAuth(),user.deleteuser);
userRouter.post('/gettoken',isAuth(),user.verifyToken)



export default userRouter;