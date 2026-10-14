import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectToDb from "./src/config/db.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", () => {
  console.log("user connected");
});

connectToDb();

httpServer.listen(3000, () => {
  console.log("server is running");
});
