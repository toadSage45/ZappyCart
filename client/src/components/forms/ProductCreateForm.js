import { Select } from 'antd';
import React from 'react'


const {Option} = Select;


const ProductCreateForm = (props) => {
    const { title, description, price, categories, category, subs, shipping, quantity, images, color, brand } = props.values;

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className='form-control'
                    value={title}
                    onChange={props.handleChange}
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className='form-control'
                    value={description}
                    onChange={props.handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="text"
                    name="price"
                    className='form-control'
                    value={price}
                    onChange={props.handleChange}
                />
            </div>


            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className='form-control'
                    value={quantity}
                    onChange={props.handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className='form-control'
                    onChange={props.handleChange}
                >
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Color</label>
                <input
                    type="text"
                    name="color"
                    className='form-control'
                    value={color}
                    onChange={props.handleChange}
                />
            </div>

            <div className="form-group">
                <label>Brand</label>
                <input
                    type="text"
                    name="brand"
                    className='form-control'
                    value={brand}
                    onChange={props.handleChange}
                />
            </div>

            <div className="form-group">
                <label>Parent Category</label>
                <select name="category" className="form-control" onChange={props.handleCategoryChange}>
                    <option>Please Select</option>
                    {
                        categories.length > 0 &&
                        categories.map((c) => {
                            return (
                                <option key={c._id} value={c._id} >{c.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            {props.showSub &&  <div className='form-group'>
                <label >Sub Categories</label>
                <Select mode="multiple" style={{width: '100%'}}
                placeholder="Please Select"
                value ={subs}
                onChange={(value)=>props.setValues({...props.values, subs: value})}
                >
                    {props.subOptions.length && 
                        props.subOptions.map((s)=>{
                            return (<Option key={s._id} value={s._id}>{s.name}</Option>)
                        })
                    }
                    
                </Select>
            </div>}

            <br/>

            <button
                type="submit"
                className="btn btn-primary btn-lg w-30 shadow-lg rounded-pill px-4 py-2 my-3"
            >{props.PlusCircleOutlined} &nbsp; Save</button>
        </form>
    )
}

export default ProductCreateForm