// @flow
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ShopPage from '../pages/ShopPage/ShopPage';
import Layout from '../pages/layout/Layout';
import DetailPage from '../pages/Product/DetailPage/DetailPage';
import { Login } from '../pages/Login/Login';
import { SignupPage } from '../pages/SignUp/SignupPage';
import { Cart } from '../pages/Cart/Cart';
import { Checkout } from '../pages/Checkout/Checkout';


export default function AppRouter() {
    return (
        <BrowserRouter >   
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='shop' element={<ShopPage />} />
                    <Route path='detail/:productId'  element={<DetailPage />}/>
                    <Route path='cart' element={<Cart />} />
                    <Route path='/checkout' element={<Checkout />} />
                </Route>
                <Route path='/dangnhap' element={<Login />}/>
                <Route path='/dangky' element={<SignupPage />}/>
            </Routes>
        </BrowserRouter>
    );
};