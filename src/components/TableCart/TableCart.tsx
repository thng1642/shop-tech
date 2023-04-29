import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filterActions } from "../../redux/Filter/FilterSlice";
import { RootState } from "../../app/store";
import { CartRecord } from "../Cart/CartRecord";

export function TableCart() {

    const dispatch = useAppDispatch()

    const demo = useAppSelector((state:RootState) => state.filter)

    useEffect(()=>{
        dispatch(filterActions.getKeyFilter(''))
    }, [])
    
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
                demo.map((value, index) => (
                    <CartRecord {...value} key={index}/>
                ))
            }
        </div>
    );
};