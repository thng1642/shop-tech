import { fork, takeLatest } from "redux-saga/effects";
import { cartActions } from "./CartSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../model/cart";

function workerAddToCart(action:PayloadAction<Item>) {
    // save localStorage
    
}

function* addingItemCart() {
    yield takeLatest(cartActions.addItemIntoCart, workerAddToCart)
}

export function* watcherAddToCart() {

    yield fork(addingItemCart)
}