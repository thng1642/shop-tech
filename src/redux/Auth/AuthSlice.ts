import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { AuthDto, LoginDto } from "../../model/auth";

const initialState:AuthDto = {
    email: '',
    name: '',
    phone: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authAccount(state, action:PayloadAction<LoginDto>){

            // let tmp = {...state}
            // tmp.email = action.payload.email
            
            // return tmp
        },
        logoutAccount() {},
        authAccountSuccess(state, action:PayloadAction<AuthDto>) {
            
            let tmp = {...state}
            tmp = action.payload
            localStorage.setItem('currentUser', JSON.stringify(tmp))
            return tmp
        },
        authAccountFail(state) {

            let tmp = {...state}

            tmp.email = 'false'

            localStorage.setItem('isAuth', 'false')
            return tmp
        }
    }
})

const authReducers = authSlice.reducer
export default authReducers
export const authActions = authSlice.actions