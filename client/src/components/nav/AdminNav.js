import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav>
        <ul className='nav flex-column'>
            <li className=' nav-item'>
               <Link to = "/admin/dashboard"  className='nav-link'>DASHBOARD</Link>
            </li>

            <li className='nav-item'>
               <Link to = "/admin/product" className='nav-link' >ADD PRODUCT</Link>
            </li>

            <li className=' nav-item'>
               <Link to = "/user/products" className='nav-link' >PRODUCTS</Link>
            </li>

            <li className=' nav-item'>
               <Link to = "/admin/category" className='nav-link' >CATEGORY</Link>
            </li>
            
            <li className=' nav-item'>
               <Link to = "/admin/sub" className='nav-link' >SUB CATEGORY</Link>
            </li>

            <li className=' nav-item'>
               <Link to = "/admin/coupon" className='nav-link' >COUPONS</Link>
            </li>

            <li className=' nav-item'>
               <Link to = "/user/password" className='nav-link' >PASSWORD</Link>
            </li>
        </ul>
    </nav>
  )
}

export default AdminNav