import React, { useEffect, useState } from 'react'
import AdminNav from "../../components/nav/AdminNav.js"

const AdminDashboard = () => {
 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav/>
        </div>
        <div className="col">
          <h4>AdminDashboard</h4>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;

