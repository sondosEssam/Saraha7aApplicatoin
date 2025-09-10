import express from 'express'
import { db_conneciton } from './DB/connection.js';
// import userRouter from './src/Modules/user/user.router.js';
import * as Routers from './src/index.routers.js'
import { config } from 'dotenv';
import cors from 'cors';
const app  = express();

config(); //Enables you to use eveeery variable inside the env




//middlewhere
app.use(express.json());
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:4200", // your Angular app URL
           // if you use cookies or auth headers
}));


app.use('/user',Routers.userRouter);
app.use('/mes',Routers.messageRouter)
app.use((err,req,res,next)=>{
    res.json({message:err.message})
})

db_conneciton();


//listen
app.listen(port,()=>{
    console.log(`Sara7aha App server is running ${port}`)
})


