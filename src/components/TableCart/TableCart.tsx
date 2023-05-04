import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filterActions } from "../../redux/Filter/FilterSlice";
import { RootState } from "../../app/store";
import { CartRecord } from "../Cart/CartRecord";
import { Item } from "../../model/cart";
import { cartActions } from "../../redux/Cart/CartSlice";

export function TableCart() {

    const dispatch = useAppDispatch()

    const cart = useAppSelector((state:RootState) => state.cart)

    const [items, setItems] = useState<Item[]>([] as Item[])

    useEffect(()=>{

        let listCart = localStorage.getItem('listCart')
        if (listCart !== null) {

            setItems(JSON.parse(listCart))
            if (cart.length === 0) {

                dispatch(cartActions.getItemsCart())
            }
        } 
        
    }, [])
    
    useEffect(()=>{
        // console.log("Table Cart");
        setItems(cart)
    },[cart])
    return (
        <div className="italic">
            {/* Heading row */}
            <div className="uppercase text-xs font-medium text-center bg-[#ECEEEC] lg:h-10 grid grid-cols-[13%_27%_repeat(3,_1fr)_55px] items-center">
                <span>image</span>
                <span>product</span>
                <span>price</span>
                <span>quantity</span>
                <span>total</span>
                <span>remove</span>
            </div>
            {/*  Data table */}
            {
                items.map((value, index) => (
                    <CartRecord {...value} key={index}/>
                ))
            }
        </div>
    );
};