import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AllProviders from './Contexts/AllProviders';
import Navbar from './Layout/Navbar/Navbar';
import ScrollToTop from './Hook/ScrollToTop';
import Footer from './Layout/Footer/Footer';
import React, { useState } from 'react';

import ProductDetail from './Pages/Products/ProductDetail/ProductDetailPage';
import Products from './Pages/Products/Products';
import Event from './Pages/Event/Event';
import Coupon from './Pages/Coupon/Coupon';
import ShoppingCart from './Pages/Account/ShoppingCart/ShoppingCart';
import Checkout from './Pages/Account/ShoppingCart/Checkout';
import Member from './Pages/Member';

function App() {
  return (
    <>
      <BrowserRouter>
        <AllProviders>
          <Navbar />
          <ScrollToTop>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="/" element={<Navigate to="home" replace={true} />} />
              <Route path="/products">
                <Route path=":currentPage" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/category" element={<Products />} />
                <Route
                  path="/products/product_detail/:product_id"
                  element={<ProductDetail />}
                />
              </Route>
              <Route path="event" element={<Event />} />
              <Route path="coupon" element={<Coupon />} />
              <Route path="member" element={<Member />}>
                <Route path="shoppingcart" element={<ShoppingCart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </ScrollToTop>
          <Footer />
        </AllProviders>
      </BrowserRouter>
    </>
  );
}

export default App;
