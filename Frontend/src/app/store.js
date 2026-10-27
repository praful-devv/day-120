import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./features/auth/states/authSlice"
import chatSlice from "./features/home/states/chat.slice"

const store = configureStore({
    reducer:{
        auth:authSlice,
        chat:chatSlice
    }
})

export default store