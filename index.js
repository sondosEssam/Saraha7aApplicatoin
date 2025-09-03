import express from 'express'
import { db_conneciton } from './DB/connection.js';
// import userRouter from './src/Modules/user/user.router.js';
import userRouter from './src/Modules/user/user.router.js'
import messageRouter from './src/Modules/message/messgae.router.js';
import { config } from 'dotenv';

const app  = express();

config(); //Enables you to use eveeery variable inside the env


//middlewhere
app.use(express.json());
const port = process.env.PORT;


app.use('/user',userRouter);
app.use('/mes',messageRouter)

db_conneciton();
//listen
app.listen(port,()=>{
    console.log('Sara7aha App server is running')
})


