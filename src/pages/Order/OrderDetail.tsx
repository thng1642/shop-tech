import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatPrice } from "../../components/Card/script"
import { URL } from "../../app/constant"

function OrderDetail() {

    const { orderId } =  useParams()
    const nav = useNavigate()
    const [ order, setOrder ] = useState<any>({})

    useEffect(() => {
        const access_token = sessionStorage.getItem('access_token')
        const userStr = sessionStorage.getItem('userInfo')
        if ( !access_token || !userStr ) {
            nav('/dangnhap')
        }
        let userInfo
        if (userStr !== null) {
            userInfo = JSON.parse(userStr)
        }
        if (orderId) {
            // Call api get details order
            ;( async () => {
                try {
                    
                    const res = await axios.post(URL+'/api/v1/detail/order', {
                        orderId: orderId,
                        userInfo: userInfo
                    },
                    {
                        headers: { 
                            'Authorization': 'Bearer ' + access_token, 
                            'Content-Type': 'application/json'
                        }
                    })
                    // const orders = res.data
                    setOrder(res.data)
                    console.log("Data orders: ", res.data)
                } catch (error: any) {
                    console.log(error)
                }
            })()
        }
    }, [])

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl italic font-normal mb-4">Thông tin đơn hàng</h2>
            {/* Overview */}
            <div className="text-gray-500 flex flex-col italic mb-4">
                <span>Email: { (order.email) }</span>
                <span>Họ và tên: { order.name }</span>
                <span>Sđt: { order.phoneNumber }</span>
                <span>Địa chỉ: { order.address }</span>
                <span>Total: { (order.totalPrice) ? formatPrice(order.totalPrice) : null } VND</span>
            </div>
            {/* Table list items */}
            <div className="uppercase bg-[#ECEEEC] lg:h-10 grid grid-cols-[repeat(4,_1fr)_100px] text-center items-center">
                <span>product id</span>
                <span>image</span>
                <span>name</span>
                <span>Price</span>
                <span>count</span>
            </div>
            {/* Records */}
            {
                ( Boolean(order.items) ) ? 
                    order.items.map((value:any, index:number) => (

                        <div className="grid grid-cols-[repeat(4,_1fr)_100px] text-center items-center mb-2" key={index}>
                            <span>{value._id}</span>
                            <span>
                                <img className="w-full h-auto object-contain" src={value.image} alt="Anh san pham" />
                            </span>
                            <span>{value.name}</span>
                            <span>{formatPrice(value.price)}<br/>VND</span>
                            <span>{value.quantity}</span>
                        </div> 
                    ))
                
                : null
            }
        </section>
    )
}
export default OrderDetail