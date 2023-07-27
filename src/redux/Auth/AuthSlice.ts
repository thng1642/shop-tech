import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { AuthDto, LoginDto } from "../../model/auth";

const initialState:AuthDto = {
    access_token: '',
    userInfo: {
        email: '',
        firstName: '',
        lastName: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authAccount(state, action:PayloadAction<LoginDto>){},
        logoutAccount() {},
        authAccountSuccess(state, action:PayloadAction<AuthDto>) {

            sessionStorage.setItem('access_token',
                action.payload.access_token)
            sessionStorage.setItem('userInfo', 
                JSON.stringify(action.payload.userInfo))
            return action.payload
        },
        authAccountFail(state) {}
    }
})

const authReducers = authSlice.reducer
export default authReducers
export const authActions = authSlice.actions