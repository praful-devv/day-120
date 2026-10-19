import {Router} from 'express';
import { getmeController, loginController, registerController, verifyEmail } from '../controller/auth.controller.js';
import  { registerValidation,loginValidation } from "../validation/auth.validator.js"
import { identifyUser } from '../middleware/auth.middleware.js';

const authRouter = Router()

authRouter.post("/register",registerValidation,registerController)

authRouter.get("/verify-email",verifyEmail);

authRouter.post("/login", loginValidation, loginController);

authRouter.get("/get-me",identifyUser,getmeController)
export default authRouter