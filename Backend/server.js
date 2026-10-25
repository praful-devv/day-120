import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { createServer } from "http";

import connectToDb from "./src/config/db.js";

import { initSocket } from "./src/sockets/server.socket.js";
const httpServer = createServer(app);

initSocket(httpServer)

  
connectToDb();

httpServer.listen(3000);
