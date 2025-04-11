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
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryForm from '../../../components/forms/CategoryForm';
import { getSub, updateSub } from '../../../functions/sub';

const SubUpdate = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.user)
    const [oldName, setOldName] = useState("");
    const [parent, setParent] = useState("");
    const [categories, setCategories] = useState([]);

    const { slug } = useParams();

    useEffect(() => {
        //console.log(slug);
        loadSub();
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

    const loadSub = () => {
        getSub(slug)
            .then((s) => {
                setOldName(s.data.name);
                setName(s.data.name);
                setParent(s.data.parent);
            })
            .catch((err) => {
                //console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(name)
        setLoading(true);
        // console.log(token , name);
        updateSub(slug, { changedName: name, parent }, token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName("");
                toast.success(`"${oldName}" is updated to "${res.data.name}"`);
                navigate("/admin/sub");
            })
            .catch((err) => {
                //console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }




    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2"> <AdminNav /> </div>

                <div className="col">
                    {(loading) ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Sub Category</h4>}

                    <div class="form-grouo">
                        <label>Parent Category</label>
                        <select name="category" className="form-control" onChange={(e) => {
                            setParent(e.target.value);
                        }}>

                            {
                                categories.length > 0 &&
                                categories.map((c) => {
                                    return (
                                        <option
                                            key={c._id}
                                            value={c._id}
                                            selected={c._id === parent}
                                        >
                                            {c.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <CategoryForm handleSubmit={handleSubmit}

                        name={name}
                        setName={setName}
                        loading={loading}
                        text={"Update"}
                        icon={<EditOutlined />}
                    />
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default SubUpdate