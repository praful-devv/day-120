
import { Server } from "socket.io";

let io;

export function initSocket(httpServer){
    io = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    console.log("socket")

    io.on("connection",(socket)=>{
        console.log(socket.id )
    })
}

export function getIo(){
    if(!io){
        return new Error("socket is not initialized")
    }

    return io
}