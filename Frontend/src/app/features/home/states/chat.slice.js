import {createSlice} from "@reduxjs/toolkit"

const chatSlice = createSlice({
      name:"chat",
      initialState:{
        chats:{}, 
        currentChatId:null,
        isLoading:false,
        error:null
      },
      reducers:{
        setchat:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.error
        }
      }
})

export const {setchat,setCurrentChatId,setLoading,setError} = chatSlice.actions

export default chatSlice.reducer