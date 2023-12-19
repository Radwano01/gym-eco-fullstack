import React from 'react'
import "./adminpage.scss"
import Navbar from '../../components/navbar/Navbar'
import {BiSolidUserCircle} from "react-icons/bi"
import {AiOutlineCaretRight} from "react-icons/ai"
import { Route, Routes } from 'react-router-dom'
import EditProduct from './editproduct/EditProduct'
import AddProduct from './addproduct/AddProduct'
import AllProducts from './allproducts/AllProducts'
import AdminHome from './adminhome/AdminHome'
import AdminOnlyRoute from '../../components/adminonlyroute/AdminOnlyRoute'
import OrdersAdmin from './orders/OrdersAdmin'
import OrderDetails from './orders/orderdetails/OrderDetails'

const AdminPage = () => {
  return (

        <div className='admin'>
            <br /><br /><Navbar type={"slider-navbar"}/><br />
            <AdminOnlyRoute>
                <div className="admin-container">
                    <div className='admin-navbar'>
                        <div className='admin-nav'><br />
                            <div className="admin-user-page">
                                <BiSolidUserCircle size={50} color='black'/>
                                <b>ADMIN</b>
                            </div>
                            <hr />
                            <ul>
                                <h3><a href='/admin/homepage'><AiOutlineCaretRight size={18}/>Home</a></h3>
                                <h3><a href='/admin/add-product'><AiOutlineCaretRight size={18}/> Add Product</a></h3>
                                <h3><a href='/admin/admin-orders'><AiOutlineCaretRight size={18}/>Orders</a></h3>
                                <h3><a href='/admin/all-products'><AiOutlineCaretRight size={18}/>All Products</a></h3>
                            </ul>
                        </div>
                    </div>
                    <div className="admin-screen">
                        <Routes>
                            <Route path='/homepage' element={<AdminHome/>}/>
                            <Route path='/add-product' element={<AddProduct/>}/>
                            <Route path='/all-products' element={<AllProducts/>}/>
                            <Route path='/admin-orders' element={<OrdersAdmin/>}/>
                            <Route path='/admin-orders/:id' element={<OrderDetails/>}/>
                            <Route path='/edit-product/:id' element={<EditProduct/>}/>   
                        </Routes>
                    </div>
                </div>
            </AdminOnlyRoute>
        </div>
    
  )
}
export default AdminPage