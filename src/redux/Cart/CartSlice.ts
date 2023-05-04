import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { Item, UpdateItem } from "../../model/cart";
import { Product } from "../../model/product";

const initialState = [] as Item[]

type Id  = {
    '$oid': string
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        getItemsCart(state) {

            let listCart = localStorage.getItem('listCart')
            let tmp
            if (listCart !== null) {
                tmp = JSON.parse(listCart)
            } 
            return tmp
        },

        addItemIntoCart(state, action:PayloadAction<Item>){
            
            let listCart = localStorage.getItem('listCart')
            let tmp
            if (listCart !== null) {
                tmp = JSON.parse(listCart)
            } else {
                tmp = [...state]
            }

            tmp.push(action.payload)

            localStorage.setItem('listCart', JSON.stringify(tmp))

            return tmp
        },

        deleteItemCart(state, action:PayloadAction<string>) {
            console.log("delete item: ", action.payload);
            // delete in reducer
            let tmp = [...state]
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].id === action.payload) {

                    tmp.splice(i, 1)
                    break
                }
            }
            // delete in localStorage
            localStorage.setItem('listCart', JSON.stringify(tmp))
            
            return tmp
        },

        updateItemCart(state, action: PayloadAction<UpdateItem>) {
            // console.log("update items: ", action.payload.quantity);
            

            let listCart = localStorage.getItem('listCart')
            let tmp
            if (listCart !== null) {
                tmp = JSON.parse(listCart)
            } else {
                tmp = [...state]
            }
            let n = tmp.length
            for (let i = 0; i < n; i++) {
                if (action.payload.id === tmp[i].id) {

                    tmp[i].quantity = action.payload.quantity
                    tmp[i].total = Number(tmp[i].price) * action.payload.quantity
                    break
                }
            }

            localStorage.setItem('listCart', JSON.stringify(tmp))

            return tmp
        }
    }
})

const cartReducers = cartSlice.reducer
export default cartReducers
export const cartActions = cartSlice.actions