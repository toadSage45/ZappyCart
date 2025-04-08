import React from 'react'
import UserNav from '../../components/nav/UserNav.js'


const Wishlist = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2"> <UserNav/ > </div>

            <div className="col">
                User wishlist Page
            </div>
        </div>
    </div>
  )
}

export default Wishlist