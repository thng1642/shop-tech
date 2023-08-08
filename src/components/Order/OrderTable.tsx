import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filterActions } from "../../redux/Filter/FilterSlice";
import { RootState } from "../../app/store";
import { CartRecord } from "../Cart/CartRecord";
import { Item } from "../../model/cart";
import { cartActions } from "../../redux/Cart/CartSlice";
import OrderRecord from "./OrderRecord";
import axios from "axios";
import { URL } from "../../app/constant";

function OrderTable() {
    const [ orders, setOrders ] = useState<any[]>([])
    useEffect(() => {
        // Loading list orders
        const access_token = sessionStorage.getItem('access_token')
        const userStr = sessionStorage.getItem('userInfo')
        let userInfo
        if (userStr !== null) {
            userInfo = JSON.parse(userStr)
        }
        // Call api
        ;( async () => {
            try {
                
                const res = await axios.post(URL+'/api/v1/order', {
                    userInfo: userInfo
                },
                {
                    headers: { 
                        'Authorization': 'Bearer ' + access_token, 
                        'Content-Type': 'application/json'
                    }
                })
                // const orders = res.data
                setOrders(res.data)
                // console.log("Data orders: ", orders)
            } catch (error: any) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className="italic">
            {/* Heading row */}
            <div className="uppercase text-xs font-medium text-center bg-[#ECEEEC] lg:h-10 grid grid-cols-[200px_160px_140px_200px_repeat(2,_12%)_1fr] items-center">
                <span>Order ID</span>
                <span>Name</span>
                <span>phone</span>
                <span>Address</span>
                <span>total</span>
                <span>status</span>
                <span>detail</span>
            </div>
            {/*  Data table */}
            {
                orders.map((value, index) => (
                    <OrderRecord {...value} key={index}/>
                ))
            }
        </div>
    );
}
export default OrderTable