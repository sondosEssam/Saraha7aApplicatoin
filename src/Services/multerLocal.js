import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from 'path'
export const allExtenstions={
    Image:['image/webp','image/png'],
    Application:['application/pdf'],
    Video:['video/mp4'],
}
export const multerlocal = (allExtenstions,custemPath)=>{
    const dest_path = path.resolve(`uploads/user/${custemPath}`);
    if(!fs.existsSync(dest_path)){
        fs.mkdirSync(dest_path,{recursive:true});
    }
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,dest_path)
        },
        filename:function(req,file,cb){
            const uniqueStr = nanoid()+ file.originalname;
        cb(null,uniqueStr);
        }

    })

    const fileFilter = function(req,file,cb){
        if(allExtenstions.includes(file.mimetype)){
            return cb(null,true);
        }
            cb(new Error('invalid method'), false);
    }
    const uplaodFile = multer({fileFilter,storage});
    return uplaodFile
}