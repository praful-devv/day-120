import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: {},
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    createnewchat: (state, action) => {
      const { chatId, title } = action.payload;
      state.chats[chatId] = {
        id: chatId,
        title,
        message: [],
        lastUpdate: new Date().toString(),
      };
    },
    addnewmessage:(state,action)=>{
        const { chatId, content, role } = action.payload;
        state.chats[chatId].message.push({ content, role });
    },
    setchat: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error;
    },
  },
});

export const {
  setchat,
  setCurrentChatId,
  setLoading,
  setError,
  createnewchat,
  addnewmessage,
} = chatSlice.actions;

export default chatSlice.reducer;
