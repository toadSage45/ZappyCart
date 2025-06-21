import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
    DeleteFilled,
    EditFilled,
    EditOutlined,
    Loading3QuartersOutlined,
    LoadingOutlined,
    PlusCircleFilled,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import LocalSearch from '../../../components/forms/LocalSearch';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';


const initialState =
{
    title: "",
    description: "",
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Lenovo", "Microsoft", "ASUS"],
    color: '',
    brand: ''

}


const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState("");
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector(state => state.user)

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories()
            .then((c) => setValues({ ...values, categories: c.data }))
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createProduct(values, token)
            .then((res) => {
                console.log(res);
                window.alert(`${res.data.title} Created Successfully`);
                window.location.reload();
            })
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
                toast.error(err.response.data.err);
            })

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name ,"-----" ,e.target.value);
    }
    const handleCategoryChange = (e) => {
        e.preventDefault();
        //console.log(`clicked category ${e.target.value}`)
        setValues({ ...values, subs:[], category: e.target.value })
        getCategorySubs(e.target.value)
            .then(res => {
                //console.log("res.data-- ",res.data);
                setSubOptions(res.data);
                setShowSub(true);
            })
            .catch()
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className='text-danger h1'/> :<h4>Product Create</h4>}
                    {/* {JSON.stringify(values.images)} */}
                    <hr />

                    <div className="p-3">
                        <FileUpload 
                        values={values} 
                        setValues={setValues} 
                        setLoading={setLoading} 
                        />
                    </div>

                    <br />
                    
                    <ProductCreateForm
                        showSub={showSub}
                        subOptions={subOptions}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        PlusCircleOutlined={<PlusCircleOutlined />}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values} />

                </div>
            </div>
        </div>
    )
}

export default ProductCreate