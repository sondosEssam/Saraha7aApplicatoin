import { messageModel } from "../../../DB/models/message.model.js";



export const addMessage = async(req,res,next)=>{
    try {
        const {content,sender_id,recevier_id} = req.query;
        const message = await messageModel.create({content,sender_id,recevier_id});
        if(message)
                return res.json({mes:"message added succesffully", message});
        return res.json({mes:"cannpt add message"});
    } catch (error) {
         res.json({mes:"cannpt add message",error});
    }
}



export const getMessage = async(req,res,next)=>{
    try {
        const {recevier_id} = req.query;
        const messages = await messageModel.find({recevier_id});
        if(messages && messages.length!=0)
                return res.json({mes:"message added succesffully", messages});
        return res.json({mes:"cannpt get message"});
    } catch (error) {
         res.json({mes:"cannpt get message",error});
    }
}



export const deleteMessage = async(req,res,next)=>{
    try {
        const {recevier_id} = req.query;
        const messages = await messageModel.deleteMany({recevier_id});
        if(messages)
                return res.json({message:"messages deleted succesffully", messages});
        return res.json({mes:"cannpt delete messages"});
    } catch (error) {
         res.json({mes:"cannpt delete messages",error});
    }
}
export const deleteOneMessage = async(req,res,next)=>{
    try {
        const {recevier_id} = req.query;
        const messages = await messageModel.deleteMany({recevier_id});
        if(messages)
                return res.json({message:"messages deleted succesffully", messages});
        return res.json({mes:"cannpt delete messages"});
    } catch (error) {
         res.json({mes:"cannpt delete messages",error});
    }
}
