import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./features/auth/states/authSlice"
const store = configureStore({
    reducer:{
        auth:authSlice
    }
})

export default store