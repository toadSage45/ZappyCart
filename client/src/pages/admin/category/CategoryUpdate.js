import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
    DeleteFilled,
    EditFilled,
    EditOutlined,
    PlusCircleFilled,
    PlusCircleOutlined
} from "@ant-design/icons";
import { createCategory, getCategories, getCategory, removeCategory, updateCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {Link, useNavigate, useParams} from "react-router-dom";
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.user)
    const [oldName , setOldName] = useState("");

    const {slug} = useParams();

    useEffect(() => {
        //console.log(slug);
        loadCategory();
    },[])

    const loadCategory = () => {
        getCategory(slug)
        .then((c) => {
            setOldName(c.data.name);
            setName(c.data.name)
        })
        .catch((err) => {
            //console.log(err);
            if(err.response.status === 400 ) toast.error(err.response.data)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true);
       // console.log(token , name);
        updateCategory(slug , {changedName : name} , token)
        .then((res) => {
            console.log(res);
            setLoading(false);
            setName("");
            toast.success(`"${oldName}" is updated to "${res.data.name}"`);
            navigate("/admin/category");  
        })
        .catch((err) => {
            //console.log(err);
            setLoading(false);
            if(err.response.status === 400 ) toast.error(err.response.data)
        })
    }


    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"> <AdminNav /> </div>

                <div className="col">
                 {(loading)?<h4 className='text-danger'>Loading...</h4> : <h4>Update Category</h4>}
                 <CategoryForm handleSubmit ={handleSubmit} 
                    name = {name} 
                    setName = {setName}
                    loading = {loading}
                    text = {"Update"}
                    icon = {<EditOutlined/>}
                    />
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate