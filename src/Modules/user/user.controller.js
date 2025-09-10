import { userModel } from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import fs from 'fs'

import { sendEmailService } from "../../Services/sendEmail.js";

export const signUp = async(req,res,next)=>{
try {
    const {userName, email, password, gender} = req.body;
    
    const isUserExist = await userModel.findOne({email});
    // console.log(isUserExist);
    
    if(isUserExist){
        return res.json({message:"user already exists!", isUserExist})
    }
    //sending email to user
    //     await sendEmailService({
    //     to:email,
    //     subject:"signing up successfully!",
    //     message:"signed up"
    // })


    //confirm 
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1h'});
    const confirmEmail = `http://localhost:10000/user/confirmemail/${token}`;
    const message = `<a href=${confirmEmail}>Verfiy it's me</a>`

    await sendEmailService({
        to:email,
        subject:"Confirm sign up",
        message: message
    })
    //hashing password
    const hashPassword = bcrypt.hashSync(password,+process.env.SECRET_KEY);
    const addUser = await userModel.create({userName, email, password:hashPassword, gender});

    res.json({message:"user added succesfully!",addUser})
} catch (error) {
    res.json({message:"can't add user",error})
}
}

export const confirmEmail = async (req,res,next)=>{
    try {
    const {token} = req.params;
    const decoded_token = jwt.verify(token,process.env.SECRET_KEY);

        const isExist = await userModel.findOne({email:decoded_token.email});
        if(isExist.isConfirmed)
            return res.json({message:"already confimere"})
        
        const user = await userModel.findOneAndUpdate({email:decoded_token.email},{isConfirmed:true},{new:true})
    res.json ({message:"user confirmed successfully "});
    } catch (error) {
        res.json({message:"failed to confirm, register again", error})
    }
}


export const logIn = async (req,res,next)=>{
    try{
    const{email,password} = req.body;
    const isExist = await userModel.findOne({email});

    if(isExist){
        console.log("here");
        
    const newPass = bcrypt.compareSync(password,isExist.password);
    console.log(newPass);
    
    if(newPass){
        //token
        const userToken = jwt.sign({email,id:isExist._id},process.env.SECRET_KEY,/*{expiresIn:'1h'}*/);
        return res.json({message:"login successfully", userToken})
    }
    return res.json({message:"wrong password"});
    }
    return res.json({message:"email doesn't exist"})
    }catch(error){
        res.json({message:"failed to login",error})
    }
}

//verfiy token
export const verifyToken = async (req,res,next)=>{
    try {
        const {token} = req.body;
    const decoded_token = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded_token);
    if(!decoded_token){
        return res.json({message:"wrong"});
    }
    return res.json({message:"valid",decoded_token});
    } catch (error) {
        res.json({mesage:"no",error})
    }
}


//upload files
export const profileImage = async (req,res,next)=>{
    try {
        // console.log(req.file);
        // console.log(req.file.path);
        
        const imgInfo = {
        data: fs.readFileSync(req.file.path),
        contentType:req.file.mimetype
    }
    const user = await userModel.findOneAndUpdate({_id:req.authuser._id},{profile_img:imgInfo});
        if(!user)
            return res.json({message:"User doens't exist",user});
     return res.json({message:"done, upadted suceefully", /*file:req.file ,*/ user:user });
    } catch (error) {
        res.json({message:"some error happened here ", error})
    }

}
export const getProfileImage = async (req,res,next) =>{
    try{
            const user = await userModel.findById({_id:req.authuser._id});
            if(!user)
            return res.json({message:"User doens't exist",user});
        res.set("Content-Type",user.profile_img.contentType);
        res.send(user.profile_img.data);
    //  return res.json({message:"done, upadted suceefully", /*file:req.file ,*/ user:user });
    } catch (error) {
        res.json({message:"some error happened here ", error})
    }
}

export const addGallary = async (req,res,next)=>{
    try {
        const imgs = req.files;
        const imgsInfo = [];
        for(let img of imgs){
        let imgInfo = {
        data: fs.readFileSync(img.path),
        contentType:img.mimetype
    }
    imgsInfo.push(imgInfo)
        }
    const user = await userModel.findOneAndUpdate({_id:req.authuser._id},{Gallary_img:imgsInfo});
        if(!user)
            return res.json({message:"User doens't exist",user});
     return res.json({message:"done, upadted suceefully", /*file:req.file ,*/ user:user });
    } catch (error) {
        res.json({message:"some error happened here ", error})
    }
}

///crud
export const updateUser = async (req,res,next) =>{
    try{

    const {userName} = req.query;
    const user = await userModel.findOneAndUpdate({_id:req.authuser._id},{userName});
    if(!user)
            return res.json({message:"User doens't exist",user});
        return res.json({message:"upadted suceefully",user});
  

}catch(error){
    res.json({message:"error",error});
}
}

export const deleteuser = async (req,res,next) =>{
    try{

    const user = await userModel.findOneAndDelete({_id:req.authuser._id});
        return res.json({message:"deleted successfully", user});
    }catch(error){
                return res.json({message:"\failed to delete", error});
    }

}
export const getUser = async (req,res,next) =>{
    try{

    const user = await userModel.findById({_id:req.authuser._id});
    if(!user)
            return res.json({message:"User doens't exist",user});
    const img64Bit = user.profile_img.data.toString('base64');

        return res.json({message:"exists!",userInfo:{
            userName:user.userName,
            email:user.email,
            password:user.password,
            gender:user.gender,
            profileImgage:{
                src:img64Bit,
                type:user.profile_img.contentType
            }
        }});
    }catch(error){
                return res.json({message:"\failed to get", error});
    }

}