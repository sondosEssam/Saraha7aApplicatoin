import { Schema, Types,mongoose } from "mongoose";




const messageSchema = new Schema({
    content:{
        type:String
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    recevier_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})



export const messageModel = mongoose.model("message", messageSchema);