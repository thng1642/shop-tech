import { useEffect, useState } from "react"
import OrderTable from "../../components/Order/OrderTable"
import { useNavigate } from "react-router-dom"

function Order() {

    const nav = useNavigate()
    useEffect(() => {
        // Checking was logged in before ?
        const isLogged = Boolean(sessionStorage.getItem('access_token'))
            && Boolean(sessionStorage.getItem('userInfo'))
        if ( !isLogged ) {
            nav('/dangnhap')
        }
    })

    return(
        <main className="max-w-5xl mx-auto min-h-[80vh]">
        {/* Heading */}
        <div className='flex flex-row justify-between px-8 py-12 italic w-full mb-12 bg-[#c1c7c14d]'>
            <div className=''>
                <p className='uppercase tracking-wider text-xl font-medium'>History</p>
            </div>
            <div>
                <span className='uppercase text-gray-500'>History</span>
            </div>
            </div>
            {/* History Table for orders */}
            <OrderTable/>
        </main>
    )
}
export default Order