import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Side from './Components/Side'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import Discussions from './pages/Discussions'
import Userpage from './pages/Userpage'
import Marketplace from './pages/Marketplace'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const App = () => {
 
  return (
    <BrowserRouter>
      <Navbar/>
      <Side/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/blog' element={<Blog/>}></Route>
            <Route path='/discussions' element={<Discussions/>}></Route>
            <Route path='/shop' element={<Marketplace/>}></Route>
            <Route path='/shop/:slug' element={<ProductDetails/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/userpage' element={<Userpage/>}></Route>
            <Route path='/shopcart' element={<Cart/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App