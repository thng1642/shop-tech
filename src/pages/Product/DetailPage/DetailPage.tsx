import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useAppDispatch } from '../../../app/hooks';
import Card from '../../../components/Card/Card';
import { formatPrice } from '../../../components/Card/script';
import { Item } from '../../../model/cart';
import { Product } from '../../../model/product';
import { cartActions } from '../../../redux/Cart/CartSlice';
import { URL } from '../../../app/constant';


export default function DetailPage() {

    const {productId} = useParams()
    const dispatch = useAppDispatch()
    const navigator = useNavigate()
    const [product, setProduct] = useState<Product>({} as Product)
    const [quantity, setQuantity] = useState<number>(1)
    const [longDes, setLongDes] = useState<string[]>([] as string[])
    //  relative products
    const [listProduct, setListProduct] = useState([])

    const getArraySpecify = function(text:string) {
        const resultArray = text.split(/•|-/) 
        return resultArray
    }

    const handleClickAddToCart = function() {
        // Checking was logged in before ?
        const isLogged = Boolean(sessionStorage.getItem('access_token'))
            && Boolean(sessionStorage.getItem('userInfo'))
        if (isLogged) {
            let item:Item = {
                id: product._id,
                name: product.name,
                price: product.price,
                img: product.img1,
                quantity: quantity,
                total: JSON.stringify((Number(product.price) * quantity))
            }
            // console.log("Cart: ", item);
            dispatch(cartActions.addItemIntoCart(item))
            navigator('/shop')
        } else {
            navigator('/dangnhap')
        }
    }

    useEffect(()=>{
        ;( async () => {
            try {     
                // Get Details Product
                const res = await axios.get(`${URL}/api/v1/product/${productId}`)
                const data = res.data
                const tmp = {                   
                    _id: data._id,
                    name: data.name,
                    price: data.price,
                    category: data.category.name,
                    short_desc: data.short_desc,
                    long_desc: data.long_desc,
                    img1: data.img1,
                    img2: data.img2,
                    img3: data.img3,
                    img4: data.img4
                }
                // Gets relative products
                const resRelative = await axios.get(`${URL}/api/v1/relative/product/${data.category._id}`)
                const relativeProducts = resRelative.data.filter( (item: { _id: string | undefined; }) => item._id !== productId)
                setListProduct(relativeProducts)
                setProduct(tmp)
                setLongDes(getArraySpecify(tmp.long_desc))
            } catch (error) {
                console.log(error)
            }})()
    }, [productId])

    return(
        <main className='max-w-5xl mx-auto'>
            {/* Specification product */}
            <div className='flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-12 mb-14'>
                {/* Images */}
                <div className='order-2 grid grid-cols-[calc(20%_-_1rem)_1fr] grid-rows-1 gap-x-2'>
                    {/* cols list */}
                    <ul>
                        <li>
                            <img className='object-contain mb-2' src={product.img1} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img2} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img3} alt='left img'></img>
                        </li>
                        <li>
                            <img className='object-contain mb-2' src={product.img4} alt='left img'></img>
                        </li>
                    </ul>
                    {/* Main image */}
                    <img className='object-contain h-full' src={product.img1} alt="Main" />
                </div>
                {/* Description */}
                <div className='italic'>
                    <h3 className='font-semibold text-3xl mb-6'>{product.name}</h3>
                    <p className='text-gray-500 mb-6'>{(product.price) ? formatPrice(product.price) : null} VND</p>
                    <p className='text-gray-500 mb-6 text-sm'>{product.short_desc}</p>
                    <p className='uppercase font-medium mb-5'>category:
                        <span className='text-gray-500 lowercase'> {product.category}</span>
                    </p>
                    {/* Add to cart action */}
                    <div className='max-lg:mb-3 flex flex-row'>
                        <div className=' px-4  border border-slate-600 flex flex-row items-center w-[250px] h-10 justify-between'>
                            <span className='uppercase text-gray-500 italic'>Quantity</span> 
                            <div>
                                <ArrowLeftIcon
                                    className='cursor-pointer'
                                    onClick={()=>{  
                                        if (quantity > 1) {
                                            setQuantity(quantity - 1)
                                        }
                                    }}
                                    />
                                <span className='not-italic'>{quantity}</span>
                                <ArrowRightIcon 
                                    className='cursor-pointer'
                                    onClick={()=>{
                                        setQuantity(quantity + 1)
                                    }}
                                    />
                            </div>
                        </div>
                        {/* Button Add to cart */}
                        <div className='bg-[#353535] flex items-center w-[150px] h-10 justify-center text-[#E4E4E4] hover:cursor-pointer hover:bg-[#161515ad]' onClick={handleClickAddToCart}>
                            <span>Add to cart</span>
                        </div>
                    </div>
                </div>
                {/* More description */}
                <div className='col-span-2'>
                    <div className='bg-[#353535] text-[#E4E4E4] inline-block px-6 py-3 mb-6'>
                        <span className='uppercase italic'>description</span>
                    </div>

                    <p className='uppercase italic font-medium mb-4'>product description</p>
                    <ul className='text-gray-500 italic text-sm'>
                    {
                    longDes.map((value,index)=>(
                        (index === 0) ? <p key={index} className='uppercase'>{value}</p> :
                        <li  key={index}> - {value}</li>
                        ))
                    }
                    </ul>
                </div>
            </div>
            {/* Related product - same category */}
            <section className='lg:mb-12'>
                <h3 className='italic uppercase font-medium tracking-wider mb-4'>related products</h3>
                <div className='grid lg:grid-cols-4 gap-x-3 gap-y-4'>
                {
                    listProduct.map((value:any, index)=>(
                        <Card _id={value._id} name={value.name} avt={value.img} price={value.price} key={index} handleClick={()=>{
                            navigator(`/detail/${value._id}`)
                        }} />
                    ))
                }
                </div>
            </section>
        </main>
    );
};