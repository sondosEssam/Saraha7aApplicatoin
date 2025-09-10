
import joi from "joi"
export const userSchema = {
body:joi.object({
    userName:joi.string().min(3).max(15).required(),
    email:joi.string().email({tlds:['com','org','net']}),
    password:joi.string().regex(/^[A-Za-z0-9]{8,}$/),
    gender:joi.string().optional()
}).required()
}