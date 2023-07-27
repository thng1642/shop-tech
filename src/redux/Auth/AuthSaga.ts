import { call, fork, put, take, takeLatest } from "redux-saga/effects"; 

import { authActions } from "./AuthSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthDto, LoginDto } from "../../model/auth";
import axios from "axios";

const loginAPI = async (loginDto: LoginDto) => {
    try {
        const res = await axios
        .post("http://localhost:5000/api/v1/login", loginDto)
        return [ res.data, null ]
    } catch(err) {
        console.log("Error when call api login")
        return [ null, err ]
    }
}

function handleLogout() {

    localStorage.removeItem("currentUser")
    localStorage.removeItem('isAuth')

}

function* handleMakeAuth(action:PayloadAction<LoginDto>) {
    
    // console.log("Login Dto: ", action.payload)
    const [result, error ] :any[] = yield call(loginAPI, action.payload)
    if (result) {
        put(authActions.authAccountSuccess(result))
    } else {
        console.log(error.response.data)
    }
    // get data from localStorage
    // const userArrStr = localStorage.getItem('userArr')
    
}

function* authAccount() {

    while (true) {

        // const isLoggedIn = Boolean(localStorage.getItem('isAuth'))
        const isLoggedIn = Boolean(localStorage.getItem('access_token'))

        if (!isLoggedIn) {
            yield takeLatest(authActions.authAccount, handleMakeAuth)
        }

        yield take(authActions.logoutAccount)
        yield call(handleLogout)
    }
}

export function* watcherAuthAccount() {
    
    yield fork(authAccount)
}