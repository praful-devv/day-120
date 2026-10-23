import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../../../config/axios";

export const LoginThunk = createAsyncThunk('auth/login',async(credentials,ThunkApi)=>{
    try {
        const response = await Api.post("/auth/login",credentials)
        return response.data
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const RegisterThunk = createAsyncThunk('auth/register',async(credentials,ThunkApi)=>{
    try {
        const response = await Api.post("/auth/register",credentials)
        return response.data
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})

export const MeThunk = createAsyncThunk('auth/me',async(_,ThunkApi)=>{
    try {
        const response = await Api.get("/auth/get-me")
        return response.data
    } catch (error) {
        return ThunkApi.rejectWithValue(error)
    }
})