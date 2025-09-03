import { Router } from "express";
import * as message from './message.controller.js'
const messageRouter = Router();

messageRouter.post('/addMessage', message.addMessage);
messageRouter.get('/getMessage', message.getMessage);
messageRouter.delete('/deleteMessage', message.deleteMessage);


export default messageRouter;