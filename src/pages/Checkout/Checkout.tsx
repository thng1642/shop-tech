import { Snackbar, TextField } from "@mui/material"
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"

import { formatPrice } from "../../components/Card/script";
import { Item } from "../../model/cart";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
})
/**
 * 
 */
export function Checkout() {

    const [ items, setItems ] = useState<Item[]>([] as Item[])
    const [ accessToken, setAccessToken ] = useState(sessionStorage.getItem('access_token'))
    const [ total, setTotal ] = useState<string>('0')
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const phoneNumberRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const nav = useNavigate()

    const handelPlaceOrder = () => {
        if (!open) {
            // set up request to order
            const request = {
                access_token: accessToken,
                userInfo: {
                    name: nameRef.current
                        ?.getElementsByTagName('input')[0].value,
                    email: emailRef.current
                        ?.getElementsByTagName('input')[0].value,
                    phoneNumber: phoneNumberRef.current
                        ?.getElementsByTagName('input')[0].value,
                    address: addressRef.current
                        ?.getElementsByTagName('input')[0].value
                },
                items: items,
                totalPrice: total,
            }
            console.log(request)
        }
    }
    // Open state Alter error when happen
    const [ open, setOpen ] = useState(false)
    // Message for Alter error when happen
    const [ messError, setMessError ] = useState('')
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    useEffect(() => {
        // Checking was logged in before ?
        const isLogged = Boolean(sessionStorage.getItem('access_token'))
            && Boolean(sessionStorage.getItem('userInfo'))
        if ( !isLogged ) {
            nav('/dangnhap')
        } else {
            // Parse data at session local to Object need
            const access_token = sessionStorage.getItem('access_token')
            setAccessToken(access_token)
            const userInfoStr = sessionStorage.getItem('userInfo')
            let userInfo
            if (userInfoStr) {
                userInfo = JSON.parse(userInfoStr)
            }
            // console.log(userInfo)
            if (nameRef.current !== null) {
                nameRef.current.getElementsByTagName('input')[0]
                        .value = userInfo.firstName+ " " + userInfo.lastName
            }
            if (emailRef.current !== null) {
                emailRef.current.getElementsByTagName('input')[0]
                    .value = userInfo.email
            }
            if (phoneNumberRef.current !== null) {
                phoneNumberRef.current.getElementsByTagName('input')[0]
                        .value = userInfo.phoneNumber
            }
            if (addressRef.current) {
                addressRef.current.getElementsByTagName('input')[0].focus()
            }
        }
    }, [])
    useEffect(() => {
        
        let listCart = localStorage.getItem('listCart')

        if (listCart !== null) {
            let cart = JSON.parse(listCart)
            let totalPrice = 0
            // console.log("Cart reload with cart: ", cart);
            cart.forEach(( value: { total: string; } ) => {
                totalPrice += parseInt(value.total)
            })
            setTotal(totalPrice.toString())
            setItems(cart)
        } 
    }, [])

    return (
        <main className="max-w-5xl mx-auto min-h-[80vh]">
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {messError}
                </Alert>
            </Snackbar>
            {/* Heading */}
            <div className='flex flex-row justify-between px-8 py-12 italic w-full mb-12 bg-[#c1c7c14d]'>
                <div className=''>
                    <p className='uppercase tracking-wider text-xl font-medium'>checkout</p>
                </div>
                <div>
                    <span className="uppercase">home / cart / </span>
                    <span className='uppercase text-gray-500'>checkout</span>
                </div>
            </div>
            {/* Main content */}
            <div className="grid grid-cols-[1fr_350px] gap-x-6 italic">
                {/* Form input info */}
                <div className="mb-16">
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="full-name">full name:</label>
                        <TextField 
                            id="full-name"
                            fullWidth
                            placeholder="Enter Your Full Name Here"
                            ref={nameRef} 
                            onBlur={(event) => {                          
                                if (!event.target.value) {
                                    event.target.focus()
                                    setOpen(true)
                                    setMessError("Vui lòng điền Họ và tên")
                                }
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="email">email:</label>
                        <TextField 
                            id="email"
                            fullWidth
                            placeholder="Enter Your Email Here"
                            ref={emailRef}
                            onBlur={(event) => {                          
                                if (!event.target.value) {
                                    event.target.focus()
                                    setOpen(true)
                                    setMessError("Vui lòng nhập Email")
                                }
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="phone-number">phone number:</label>
                        <TextField 
                            id="phone-number"
                            fullWidth
                            placeholder="Enter Your Phone Number Here"
                            ref={phoneNumberRef}
                            onBlur={(event) => {                          
                                if (!event.target.value) {
                                    event.target.focus()
                                    setOpen(true)
                                    setMessError("Vui lòng điền số điện thoại")
                                }
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="uppercase tracking-wider text-gray-500 font-medium mb-2 inline-block" htmlFor="address">address:</label>
                        <TextField 
                            id="address"
                            fullWidth
                            placeholder="Enter Your Address Here"
                            ref={addressRef}
                            onBlur={(event) => {                          
                                if (!event.target.value) {
                                    event.target.focus()
                                    setOpen(true)
                                    setMessError("Vui lòng nhập địa chỉ")
                                }
                            }}
                        />
                    </div>
                    {/* Button Place Order */}
                    <div className="bg-black text-white justify-center h-10 lg:w-[150px] flex items-center uppercase italic hover:cursor-pointer hover:bg-gray-800"
                        onClick={handelPlaceOrder}
                    >
                        <span>Place order</span>
                    </div>
                </div>
                {/* Confirm checkout */}
                <div className="bg-[#ECEEEC] h-[fit-content] w-full px-8 py-10">
                    <p className="italic uppercase tracking-wider font-medium text-lg mb-6">your order</p>
                    {
                        items.map((value, index) => (
                        <div key={index} className="italic grid grid-cols-2 items-center justify-between border-b pb-2 border-gray-400 border-solid mb-4">
                            <p className="font-medium inline-block">{value.name}</p>
                            <span className="text-gray-500 text-sm">{formatPrice(value.price)} VND x{value.quantity}</span>
                        </div>
                        ))
                    }
                    {/* Total */}
                    <div className="flex flex-row justify-between">
                        <p className="italic uppercase tracking-wider font-medium ">total</p>
                        <span className="text-lg">{formatPrice(total)} VND</span>
                    </div>
                </div>
            </div>
        </main>
    );
};