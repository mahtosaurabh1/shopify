import { createSlice } from "@reduxjs/toolkit";

export interface authType {
    loading: boolean,
    userInfo:{},
    error: Error | null;
}

const initialState : authType = {
    loading : false,
    userInfo:{},
    error: null
}


export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        createAccount: (state,action)=>{
            state.loading = true;
        },
        createAccountSuccess: (state,action) =>{
            state.userInfo=action.payload
            state.loading = false;
        },
        createAccountFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        },

        loginAccount: (state,action)=>{
            state.loading = true;
        },
        loginAccountSuccess: (state,action) =>{
            state.userInfo=action.payload
            state.loading = false;
        },
        loginAccountFailure: (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
}) 

export const { createAccount,createAccountSuccess,createAccountFailure,loginAccount,loginAccountSuccess,loginAccountFailure} =authSlice.actions;

export default authSlice.reducer;