import  Router  from "express";
import * as user from './user.controller.js'



const userRouter = Router();



userRouter.post('/signup',user.signUp);
userRouter.post('/login',user.logIn);
userRouter.get('/get',user.getUser);
userRouter.patch('/update',user.updateUser);
userRouter.delete('/delete',user.deleteuser);
userRouter.post('/gettoken',user.verifyToken)



export default userRouter;