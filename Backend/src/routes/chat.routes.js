import {Router} from "express"
import { getChatsController, getMessages, messageController } from "../controller/chat.controller.js";
import { identifyUser } from "../middleware/auth.middleware.js";

const chatRouter = Router()

chatRouter.post("/message",identifyUser, messageController);


chatRouter.get("/",identifyUser,getChatsController)

chatRouter.get("/:chatId/messages",identifyUser,getMessages)

export default chatRouter