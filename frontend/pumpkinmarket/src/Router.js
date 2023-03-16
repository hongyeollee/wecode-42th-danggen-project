import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Chatting from './pages/Chatting/Chatting';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Posting from './pages/Posting/Posting';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import SignUp from './pages/SignUp/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
