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
import { createSub, getSubs, removeSub } from '../../../functions/sub';

const SubCreate = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.user)
    const [categories, setCategories] = useState([]);
    const [category ,setCategory] = useState("");
    const [subs, setSubs] = useState([]);

    //serching 
    // step-1
    const [keyword, setKeword] = useState("");


    useEffect(() => {
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () => {
        getCategories()
            .then((c) => setCategories(c.data))
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const loadSubs = () => {
        getSubs()
            .then((c) => setSubs(c.data))
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true);
        createSub({ name , parent : category}, token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadSubs();

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
            removeSub(c.slug, token,)
                .then((res) => {
                    setLoading(false);
                    loadSubs();
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
                    {(loading) ? <h4 className='text-danger'>Loading...</h4> : <h4>Create Sub Category</h4>}
                    
                    <div class="form-grouo">
                        <label>Parent Category</label>
                        <select  name="category" className= "form-control" onChange={ (e) => {
                            setCategory(e.target.value);
                        }}>
                            <option>Please Select</option>
                            {
                                categories.length > 0 &&
                                categories.map((c) => {
                                    return(
                                        <option key={c._id} value={c._id} >{c.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* {JSON.stringify(category)} */}

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

                    {subs.filter(searched(keyword)).map((s) => {
                        return (
                            <div className='alert alert-primary' key={s._id}>{s.name}
                                <span onClick={() => handleRemove(s)}
                                    className='btn btn-sm float-right'>
                                    <DeleteFilled className='text-danger' />
                                </span>
                                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate