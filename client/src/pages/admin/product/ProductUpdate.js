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
import { Link, useNavigate, useParams } from "react-router-dom";
import LocalSearch from '../../../components/forms/LocalSearch';
import { createProduct, getProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';


const initialState =
{
    title: "",
    description: "",
    price: '',
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


const ProductUpdate = () => {
    //state
    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [arrayOfSubIds, setArrayOfSubIds] = useState([])
    const [subOptions, setSubOptions] = useState([]);
    //const [showSub, setShowSub] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then((res) => {
                //load single product
                console.log(res)
                setValues({ ...values, ...res.data })
                //laod product sub categories
                getCategorySubs(res.data.category._id)
                    .then((res2) => {
                        setSubOptions(res2.data);
                    })
                //prepare sub ids for antd multiple selection
                let arr = []
                res.data.subs.map(s => {
                    arr.push(s._id);
                });
                console.log("arr: ",arr);
                setArrayOfSubIds((prev)=>arr); //for antd
            })
    }

    const loadCategories = () => {
        getCategories()
            .then((c) => {
                console.log("categories: ", c);
                setCategories(c.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        //console.log(`clicked category ${e.target.value}`)
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value)
            .then(res => {
                //console.log("res.data-- ",res.data);
                setSubOptions(res.data);
                //setShowSub(true);
            })
            .catch()

            setArrayOfSubIds([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name ,"-----" ,e.target.value);
    }




    const { token } = useSelector((state) => state.user);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Product Update</h4>

                    {JSON.stringify(values)}
                    <ProductUpdateForm
                        //showSub={showSub}
                        subOptions={subOptions}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        PlusCircleOutlined={<PlusCircleOutlined />}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        categories={categories}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                    />
                    <hr />



                </div>
            </div>
        </div>
    )
}

export default ProductUpdate