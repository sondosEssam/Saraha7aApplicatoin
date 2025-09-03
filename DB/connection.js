import moongose from 'mongoose'
export const db_conneciton = async (req,res,next)=>{
    return await moongose.connect('mongodb://localhost:27017/app_Saraha')
    .then((res)=>console.log("connection estiblashed successfully"))
    .catch((res)=>console.log("failed to connect")
    )
}