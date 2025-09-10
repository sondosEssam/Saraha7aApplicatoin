import jwt  from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";

export  const isAuth =()=>{
    return async(req,res,next)=>{
        //check token 
        const {token} = req.query;
        if(!token)
            return res.json({message:"you are not authinticated,log in first"});
        const decode_token = jwt.verify(token,process.env.SECRET_KEY);
        if(!decode_token)
            return res.json({message:"there is somehting wrong with the token, try again"});
        const user  = await userModel.findById({_id:decode_token.id});
        if(!user)
                return res.json({message:"user doesn't exits! make sure email is correct"});
        req.authuser=user;
        next();
    }
}
