import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { Product } from "../../model/product";
import { formatPrice } from '../Card/script';
import { useEffect, useState } from 'react';
import { Item, UpdateItem } from '../../model/cart';
import { useAppDispatch } from '../../app/hooks';
import { cartActions } from '../../redux/Cart/CartSlice';

export function CartRecord({...props}: Item) {

    const dispatch = useAppDispatch()

    const [quantity, setQuantity] = useState<number>(props.quantity)
    
    const [totalPrice, setTotalPrice] = useState<string>(props.total)

    useEffect(()=>{
        
        let totalPrice = Number(props.price) * quantity
        setTotalPrice(JSON.stringify(totalPrice))
        
    }, [quantity])

    // useEffect(()=>{},[props.total])

    return (
        <div className="grid grid-cols-[13%_27%_repeat(3,_1fr)_55px] items-center text-center mb-6">
            <img className="object-contain w-full" src={props.img} alt="avatar" />
            <span className="text-black font-medium">{props.name}</span>
            <span className="text-gray-500 flew flex-row items-center">{formatPrice(props.price)} <br/>VND</span>
            <div>
                <ArrowLeftIcon
                    className='cursor-pointer'
                    onClick={()=>{
                        if (quantity > 1) {
                            setQuantity(quantity - 1)

                            dispatch(cartActions.updateItemCart({id: props.id, quantity: quantity - 1} as UpdateItem))
                        }
                    }}
                    />
                <span className='not-italic'>{quantity}</span>
                <ArrowRightIcon 
                    className='cursor-pointer'
                    onClick={()=>{

                        setQuantity(quantity + 1)

                        dispatch(cartActions.updateItemCart({id: props.id, quantity: quantity + 1} as UpdateItem))
                    }}
                    />
            </div>
            <span className="text-gray-500">{formatPrice(totalPrice)}<br/>VND</span>
            <div className="" 
                onClick={()=>{
                    dispatch(cartActions.deleteItemCart(props.id))
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg"    
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-4 h-4 inline-block hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        </div>
    );
};