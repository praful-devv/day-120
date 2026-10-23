import express from "express";
import authRouter from './routes/auth.routes.js'
import ErrorHandler from "./middleware/ErrorHandler.middleware.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
app.use(cors(
    {credentials:true,
    origin:"http://localhost:5173"}
))
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter)


app.use(ErrorHandler)

export default app;
