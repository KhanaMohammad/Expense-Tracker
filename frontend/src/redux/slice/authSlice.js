
import {createSlice} from "@reduxjs/toolkit"

 const authSlice = createSlice({
    name:"auth",
    initialState : {
        user :JSON.parse(localStorage.getItem("userInfo"))  || null,
    } ,

    reducers : {
        loginAction : (state , action)=>{
            state.user = action.payload;
        },

        logoutAction :(state , action)=>{
            state.user = null;
        }
    }
})

//! Genrate action
export const {loginAction, logoutAction} = authSlice.actions;

//! Genrate the reducers
const authReducer = authSlice.reducer;
export default authReducer;