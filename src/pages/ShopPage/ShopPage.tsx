import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';


import { useAppDispatch } from '../../app/hooks';
import FilterResult from '../../components/Filter/FilterResult';
import { filterActions } from '../../redux/Filter/FilterSlice';
import filter from './filter.json';
import axios from 'axios';

// Show up filter products page
export default function ShopPage() {

    const dispatch = useAppDispatch()
    const [ category, setCategory ] = useState('')
    const [ products, setProducts ] = useState<any[]>([])

    // Fetching filter
    useEffect(() => {
        // console.log(category)
        let categoryId = ''
        switch (category) {
            case "": { 
                categoryId = "64c0f538c21346d264627333"
                break
            }
            case "all": {
                categoryId = "64c0f538c21346d264627333"
                break
            }
            case "iphone": {
                categoryId = "64c0f538c21346d264627333"
                break
            }
            case "airpod": {
                categoryId = "64c0f5834a0aac82a1f66266"
                break
            }
            case "watch": {
                categoryId = "64c0f5834a0aac82a1f66265"
                break
            }
            case "macbook": {
                categoryId = "64c0f5834a0aac82a1f66267"
                break
            }
            case "ipad": {
                categoryId = "64c0f4e66e5631c6068bf75c"
                break
            }
            default:{
                console.log("Not filter")
            }
        }
        if ( categoryId ) {
            // Call api get relative products <=> filter for category
            ;(async () => {
                const res = await axios.get(`http://localhost:5000/api/v1/relative/product/${categoryId}`)
                setProducts(res.data)
            })()
        }
    }, [category])

    return (
        <main className='max-w-5xl mx-auto'>
            {/* Banner shop */}
            <div className='flex flex-row justify-between px-8 py-12 italic w-full mb-12 bg-[#c1c7c14d]'>
                <div className=''>
                    <p className='uppercase tracking-wider text-xl font-medium'>Shop</p>
                </div>
                <div>
                    <span className='uppercase text-gray-500'>shop</span>
                </div>
            </div>
            {/* Main content */}
            <section className='italic grid grid-cols-[20%_1fr] gap-x-6'>
                 {/* Filter Bar */}
                <div>
                    <h3 className='uppercase tracking-wider font-semibold mb-4'>{filter.name}</h3>
                    <div className='bg-black h-[40px] flex items-center text-white'>
                        <span className='uppercase ml-6 tracking-wider'>{filter.brand}</span>
                    </div>
                    {
                    filter.list.map((item, index)=>(
                            <div className='' key={index}>
                            {(item.type !== '' || item.type === null) ? 
                                <h3 className='pl-6 py-2 uppercase tracking-wider text-sm font-medium mb-3 bg-[#F1F2ED]'>{item.type}</h3> : <></>
                            }
                            <ul>
                                {
                                item.values.map((value, i) => (
                                    <li 
                                        className='ml-6 hover:cursor-pointer hover:text-[#E7C35F] hover:scale-105 mb-3'     
                                        key={i}
                                        onClick={ (event)=> {
                                            let key:string = event.currentTarget.innerText
                                            key = key.toLowerCase()
                                            dispatch(filterActions.getKeyFilter(key))
                                            setCategory(key)
                                        }}
                                    >
                                        {value}
                                    </li>
                                ))
                                }
                            </ul>
                        </div>

                    ))
                    }
                </div>
                {/* Product collection */}
                <div className='mb-12'>
                    {/* Top heading */}
                    <div className='w-full flex flex-row justify-between items-center mb-3'>
                        {/* Search input */}
                        <div className="w-[250px] h-10 flex items-center border border-slate-500">
                            <input type="text" className="w-full h-full pl-3 focus:outline-none" placeholder="Enter search here!" name="subscribe" id="sub-bar" />
                        </div>
                        {/* Select options */}
                        <FormControl sx={{ m: 1, minWidth: 200}} size="small">
                            
                            <Select
                                displayEmpty
                                id="label-select-sorting"
                                input={<OutlinedInput />}
                                renderValue={()=>'Default sorting'}
                            >
                                <MenuItem value="Tăng dần">
                                    <em>Tăng dần</em>
                                </MenuItem>
                                
                            </Select>
                        </FormControl>
                    </div>
                    {/* Results Filter */}
                    <FilterResult products={products} />
                </div>

            </section>
        </main>
    );
};