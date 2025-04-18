import React, { useEffect, useState } from "react";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.user)
  useEffect(() => {
    loadAllProducts();
  }, [])

  const handleRemove = (slug)=>{
    if(window.confirm("Are youe sure to delete this product?")){
        //console.log("deleting- ", slug);
        removeProduct(slug, token)
        .then((res)=>{
          loadAllProducts();
          toast.success(`${res.data.title} deleted sucessfully`)  
        })
        .catch((err)=>{
          if(err.response.status==400) toast.error(err.response.data);
        })
    }
  }
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(500)
      .then((res) => {
        setProducts(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4 className={loading ? 'text-danger' : ''}>
            {loading ? 'Loading...' : 'Your Products'}
          </h4>
          <div className="row">
            {products.map((product) => (
              <div className='col-md-4 pb-3' key={product._id}>
                <AdminProductCard product={product} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProduct;

