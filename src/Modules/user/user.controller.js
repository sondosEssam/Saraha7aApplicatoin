import { userModel } from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt';





export const signUp = async(req,res,next)=>{
try {
    const {userName, email, password, gender} = req.body;
    
    const isUserExist = await userModel.findOne({email});
    
    if(isUserExist){
        return res.json({message:"user already exists!", isUserExist})
    }
    //hashing password 
    const hashPassword = bcrypt.hashSync(password,10);
    const addUser = await userModel.create({userName, email, password:hashPassword, gender});
    res.json({message:"user added succesfully!",addUser})
} catch (error) {
    res.json({message:"can't add user",error})
}
}

export const logIn = async (req,res,next)=>{
    try{
    const{email,password} = req.body;
    const isExist = await userModel.findOne({email});

    if(isExist){
    const newPass = bcrypt.compareSync(password,isExist.password);
    if(newPass){
        return res.json({message:"login successfully", isExist})
    }
    return res.json({message:"wrong password"});
    }
    return res.json({message:"email doesn't exist"})
    }catch(error){
        res.json({message:"failed to login",error})
    }
}

export const updateUser = async (req,res,next) =>{
    try{
    const {userName, email} = req.query;
    const user = await userModel.findOneAndUpdate({email},{userName});
    if(user)
        return res.json({message:"upadted suceefully",user});
  
    return res.json({message:"User doens't exist",user});
}catch(error){
    res.json({message:"error",error});
}
}

export const deleteuser = async (req,res,next) =>{
    try{
        const {email} = req.query;
    const user = await userModel.findOneAndDelete({email});
        return res.json({message:"deleted successfully", user});
    }catch(error){
                return res.json({message:"\failed to delete", error});
    }

}
export const getUser = async (req,res,next) =>{
    try{
        const {email} = req.query;
    const user = await userModel.findOne({email});
        return res.json({message:"exists!", user});
    }catch(error){
                return res.json({message:"\failed to get", error});
    }

}