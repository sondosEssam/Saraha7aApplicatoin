import mongoose, { Schema } from "mongoose";



const userSchema =  new Schema({
    userName:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female','not spesificed'],
        default:'not spesificed'
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    profile_img:{
        data:Buffer,
        contentType:String,
    },
    Gallary_img:{
        data:[Buffer],
        contentType:[String],
        default:[]
    }
});

export const userModel = mongoose.model('user',userSchema);

