import React from 'react'
import {
    DeleteFilled,
    EditFilled,
    EditOutlined,
    PlusCircleFilled
} from "@ant-design/icons";

const CategoryForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text"
                    className='form-control my-3'
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    autoFocus
                    required
                    disabled = {props.loading}
                    placeholder='Name here'
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-lg w-30 shadow-lg rounded-pill px-4 py-2 my-4"
                    disabled = {props.loading}
                >{props.icon}
                    &nbsp;
                    {props.text}
                </button>
            </div>
        </form>
  )
}

export default CategoryForm