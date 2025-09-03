import  Router  from "express";
import * as user from './user.controller.js'



const userRouter = Router();



userRouter.post('/signup',user.signUp);
userRouter.post('/login',user.logIn);
userRouter.post('/get',user.getUser);
userRouter.patch('/update',user.updateUser);
userRouter.delete('/delete',user.deleteuser);




export default userRouter;