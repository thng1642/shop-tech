

import { TextField } from "@mui/material";
import { TableCart } from "../../components/TableCart/TableCart";
import { Link } from "react-router-dom";

export function Cart() {
    return (
        <main className="max-w-5xl mx-auto min-h-[80vh]">
            {/* Heading */}
            <div className='flex flex-row justify-between px-8 py-12 italic w-full mb-12 bg-[#c1c7c14d]'>

                <div className=''>
                    <p className='uppercase tracking-wider text-xl font-medium'>Cart</p>
                </div>

                <div>
                    <span className='uppercase text-gray-500'>cart</span>
                </div>
            </div>

            <h3 className="uppercase font-normal italic mb-6 tracking-wide text-2xl">shopping cart</h3>

            <section className="w-full grid grid-cols-[1fr_300px] gap-x-6">
                <TableCart />
                {/* Bill */}
                <div className="bg-[#ECEEEC] h-[fit-content] w-full px-8 py-10">

                    <h3 className="italic uppercase tracking-wider font-normal text-lg mb-3">cart total</h3>

                    <div className="flex flex-row justify-between border-b pb-3 mb-3 border-gray-500">
                        <h4 className="text-sm uppercase italic">subtotal</h4>
                        <span className="text-sm text-gray-500">12.200.200 VND</span>
                    </div>

                    <div className="flex flex-row justify-between mb-6">
                        <h4 className="uppercase italic">total</h4>
                        <span className="italic text-gray-600">12.200.200 VND</span>
                    </div>

                    <TextField 
                        className="bg-white h-12"
                        fullWidth
                        placeholder="Enter your coupon"
                    />
                    {/* Button apply coupon */}
                    <div className="bg-[#383838] w-full h-12 flex flex-row justify-center items-center gap-2 text-white hover:bg-[#292525] hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z" />
                    </svg>
                        <span>Apply coupon</span>
                    </div>
                </div>
                {/* Action bar */}
                <div className="bg-[#ECEEEC] w-full h-20 px-4 flex flex-row justify-between items-center">
                    <Link to='/' className="italic flex flex-row items-center gap-2 h-10 px-3 hover:cursor-pointer bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>
                        <span>Continue shopping</span>
                    </Link>

                    <Link to='/checkout' className="italic items-center px-3 h-10 flex flex-row gap-2 border border-gray-500 hover:cursor-pointer">

                        <span>Proceed to checkout</span>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    );
};