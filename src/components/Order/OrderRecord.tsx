import { useNavigate } from "react-router-dom"
import { formatPrice } from "../Card/script"

function OrderRecord( props:any ) {

    const nav = useNavigate()
    return(
        <div className="grid grid-cols-[200px_160px_140px_200px_repeat(2,_12%)_1fr] text-sm text-center items-center mb-6">
            {/* Order ID */}
            <span>{props._id}</span>
            {/* User Name */}
            <span>{props.name}</span>
            {/* Phone User */}
            <span>{props.phoneNumber}</span>
            {/* Address */}
            <span>{props.address}</span>
            {/* Total price Order */}
            <span>{formatPrice(props.totalPrice)}<br/>VND</span>
            {/* Status Order */}
            <span>{props.status}</span>
            {/* Button View Detail */}
            <div className="italic items-center px-2 h-8 flex flex-row border border-gray-500 hover:cursor-pointer text-sm"
                onClick={() => {
                    nav(`/order/${props._id}`)
                }}
            >
                <span>View</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}
export default OrderRecord