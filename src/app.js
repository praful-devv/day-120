import express from "express";
import authRouter from './routes/auth.routes.js'
import ErrorHandler from "./middleware/ErrorHandler.middleware.js"
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter)


app.use(ErrorHandler)

export default app;
