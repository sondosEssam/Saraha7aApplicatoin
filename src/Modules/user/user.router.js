import  Router  from "express";
import * as user from './user.controller.js'

import { isAuth } from "../../middlewhere/auth.js";
import { inputsValidation } from "../../middlewhere/validation.js";
import { userSchema } from "./userSchema.js";
import { allExtenstions, multerlocal } from "../../Services/multerLocal.js";
const userRouter = Router();







userRouter.post('/signup',inputsValidation(userSchema),user.signUp);
userRouter.get('/confirmemail/:token',user.confirmEmail);
userRouter.post('/login',user.logIn);
userRouter.get('/get',isAuth(),user.getUser);
userRouter.patch('/update',isAuth(),user.updateUser);
userRouter.delete('/delete',isAuth(),user.deleteuser);
userRouter.post('/gettoken',isAuth(),user.verifyToken)
userRouter.post('/uploadimg',isAuth(),multerlocal([...allExtenstions.Image],'profile').single('profile'),user.profileImage)
userRouter.get('/image',isAuth(),user.getProfileImage);
userRouter.post('/uploadgallary',isAuth(),multerlocal([...allExtenstions.Image],'galary').array('galary',5),user.addGallary);


export default userRouter;