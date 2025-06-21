import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
    DeleteFilled,
    EditFilled,
    EditOutlined,
    PlusCircleFilled,
    PlusCircleOutlined
} from "@ant-design/icons";
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.user)
    const [categories, setCategories] = useState([]);

    //serching 
    // step-1
    const [keyword, setKeword] = useState("");


    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true);
        createCategory({ name }, token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadCategories();

            })
            .catch((err) => {
                //console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleRemove = async (c) => {
        const answer = window.confirm("Are you sure to remove " + c.name + " ?");
        //console.log(answer ,c.slug);
        if (answer) {
            setLoading(true);
            removeCategory(c.slug, token,)
                .then((res) => {
                    setLoading(false);
                    loadCategories();
                    toast.success(`${res.data.name} successfully deleted😢`)
                })
                .catch((err) => {
                    //console.log(err);
                    setLoading(false);
                    if (err.response.status === 400) toast.error(err.response.data)
                })
        }

    }


  

    // serching step-4
    const searched = (keyword) => (c) =>{
        return c.name.toLowerCase().includes(keyword);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"> <AdminNav /> </div>

                <div className="col">
                    {(loading) ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Category</h4>}


                    <CategoryForm handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                        loading={loading}
                        text={"Add"}
                        icon={<PlusCircleFilled />}
                    />

                    {/* searching step-2 */}
                    <LocalSearch 
                    keyword={keyword} 
                    setKeword={setKeword}
                    />


                    <hr />
                    
                    {/*searching step-5 */}

                    {categories.filter(searched(keyword)).map(c => {
                        return (
                            <div className='alert alert-primary' key={c._id}>{c.name}
                                <span onClick={() => handleRemove(c)}
                                    className='btn btn-sm float-right'>
                                    <DeleteFilled className='text-danger' />
                                </span>
                                <Link to={`/admin/category/${c.slug}`}>
                                    <span className='btn btn-sm float-right'>
                                        <EditOutlined className='text-danger' />
                                    </span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate