import { useEffect, useState } from 'react';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { BannerHeader } from '../../components/BannerHeader/BannerHeader';
import Card from '../../components/Card/Card';
import Chat from '../../components/ChatApp';
import DialogProduct from '../../components/PopUp/product/DialogProduct';
import SubscribeBar from '../../features/subscribe/SubscribeBar';
import { Product } from '../../model/product';
import { popupActions } from '../../redux/PopUp/PopupSlice';

export default function HomePage() {

    const [trending, setTrending] = useState<Product[]>([] as Product[])

    const [isOpenChat, setIsOpenChat] = useState<boolean>(false)

    const nav = useNavigate()

    const dispatch = useAppDispatch()

    useEffect(()=>{
        // call api
        // const getTrendingProduct = async () => {

        //     const[result, error]:any[] = await trendingApi();

        //     if (result) {
        //         const dump: Product[] = []
        //         for (let i = 0; i < 8; i++) {

        //             dump.push(result[i])
        //         }
        //         setTrending([...dump])
        //     }            
        // }
        // getTrendingProduct()
        // Gets trending products
        ;(async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/trending')
                const trendingProds = res.data
                setTrending(res.data)
                console.log(trendingProds)
            } catch(error) {

            }

        })()
    }, [])

    const handleClickCategories = () => {
        nav('shop')
    }

    return (
        <main className='max-w-5xl mx-auto'>     
            <BannerHeader />
            {/* Category Products*/}
            <section className='w-full relative flex flex-col items-center mb-12'>
                {/* Heading */}
                <div className='italic uppercase flex flex-col mb-6 items-center'>
                    <p className='text-xs tracking-wide text-gray-500'>carefully created collection</p>
                    <h3 className='tracking-wider font-medium'>browse our category</h3>
                </div>
                {/* Images */}
                <div className='w-full'>
                    <div className='grid grid-cols-[repeat(2,_1fr)] gap-6 mb-6'>
                        <img className='rounded-lg object-contain hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fproduct_1.png?alt=media&token=09afc365-0ad1-444f-8e10-d5c8b0385d2a" onClick={handleClickCategories} alt="iPhone" />
                        <img className='rounded-lg object-contain hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fproduct_2.png?alt=media&token=77850e57-cc22-4872-80cd-38f7e96201cb" onClick={handleClickCategories} alt="iMac" />
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        <img className='rounded-lg object-contain hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fproduct_3.png?alt=media&token=ac415de3-be39-4bd5-b43f-acc523f3a33a" onClick={handleClickCategories} alt="iPad" />
                        <img className='rounded-lg object-contain hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fproduct_4.png?alt=media&token=1aa445ea-5950-4357-913d-c25750012042" onClick={handleClickCategories} alt="watch" />
                        <img className='rounded-lg object-contain hover:cursor-pointer hover:bg-[#85818107] hover:scale-105 hover:shadow-lg' src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/shop%20tech%2Fproduct_5.png?alt=media&token=c4794d90-2525-499c-953a-a354b9b2986a" onClick={handleClickCategories} alt="AirPods" />
                    </div>
                </div>
                
            </section>
            {/* Trending products */}
            <section className='mb-12'>
                {/* Heading */}
                <div className='italic uppercase flex flex-col mb-6 items-start'>
                    <p className='text-xs tracking-wide text-gray-500'>made the hard way</p>
                    <h3 className='tracking-wider font-medium'>top trending products</h3>
                </div>
                {/* Trending products */}
                <div className='grid grid-cols-4 w-full gap-x-3 gap-y-6'>
                {
                trending.map((item, index)=>(
                    <Card key={index} handleClick={()=>{
                        dispatch(popupActions.showUp(item._id))
                    }} _id={item._id} name={item.name}
                    avt={item.img1} price={item.price} />
                ))
                }
                </div>
            </section>
            <DialogProduct />
            {/* Adding information */}
            <section className='max-w-5xl mx-auto py-9 italic flex flex-row justify-around bg-[#c1c7c14d] mb-12'>
                <div>
                    <h3 className='uppercase mb-3 font-medium text-xl tracking-wider'>free shipping</h3>
                    <p className='text-slate-500'>Free shipping worldwide</p>
                </div>
                <div>
                    <h3 className='uppercase mb-3 font-medium text-xl tracking-wider'>24 x 7 service</h3>
                    <p className='text-slate-500'>Free shipping worldwide</p>
                </div>
                <div>
                    <h3 className='uppercase mb-3 font-medium text-xl tracking-wider'>festival offer</h3>
                    <p className='text-slate-500'>Free shipping worldwide</p>
                </div>
            </section>
            
            {/* Subscribe bar */}
            <section className='grid grid-cols-2 w-full mb-12'>
                <div className='italic flex flex-col mb-6 items-start'>
                    <p className='uppercase tracking-wider text-xl font-medium'>let's be friends!</p>
                    <h3 className='tracking-wider text-gray-500'>Nisi nisi tempor consequat laboris bisi.</h3>
                </div>
                <SubscribeBar />
            </section>
            {/* <Chat /> */}
            <div className='min-w-[64px] fixed bottom-10 right-4 '>
                {
                    (isOpenChat) ? <Chat /> : null
                }
                <img src="https://firebasestorage.googleapis.com/v0/b/dotted-hulling-326801.appspot.com/o/messenger.png?alt=media&token=143c80a9-769a-4803-b3be-9981242b8023" alt="Message" className='hover:cursor-pointer relative ml-[calc(100%_-_64px)]' onClick={()=>{setIsOpenChat(!isOpenChat)}}/>
            </div>
        </main>
    )
};