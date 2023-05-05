import { call, fork, put, take, takeLatest } from "redux-saga/effects"; 

import { authActions } from "./AuthSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthDto, LoginDto } from "../../model/auth";

function handleLogout() {

    localStorage.removeItem("currentUser")
    localStorage.removeItem('isAuth')

}

function* handleMakeAuth(action:PayloadAction<LoginDto>) {
    
    console.log("Login Dto: ", action.payload);
    // get data from localStorage
    const userArrStr = localStorage.getItem('userArr')
    let isAuth = false
    let currentUser:AuthDto = {
        'email': '',
        'name': '',
        'phone': '',
    }

    if (userArrStr !== null) {

        const userArr = JSON.parse(userArrStr)
        for (let i in userArr) {

            if (userArr[i].email === action.payload.email) {

                isAuth = true
                currentUser.email = userArr[i].email

                if (userArr[i].password === action.payload.password) {

                    currentUser.phone = userArr[i].phone
                    currentUser.name = userArr[i].name
                    break
                }
            }
        }
    }
    // else: account not exited before
    if (isAuth && currentUser.email !== '') {

        localStorage.setItem('isAuth', JSON.stringify(isAuth))
        yield put(authActions.authAccountSuccess(currentUser))

    } else {
        yield put(authActions.authAccountFail())
    }
}

function* authAccount() {

    while (true) {

        const isLoggedIn = Boolean(localStorage.getItem('isAuth'))

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