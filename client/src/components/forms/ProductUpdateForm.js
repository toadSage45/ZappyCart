import { Select } from 'antd';
import React from 'react'


const { Option } = Select;


const ProductUpdateForm = (props) => {
    const { title, description, price, category, subs, shipping, quantity, images, colors, color, brands, brand } = props.values;

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
                    value={shipping}
                >

                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Color</label>
                <select
                    name="color"
                    className='form-control'
                    onChange={props.handleChange}
                    value={color}
                >
                    {colors.map((c) => {
                        return (
                            <option key={c} value={c}>{c}</option>
                        )
                    })}
                </select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <select
                    name="brand"
                    className='form-control'
                    onChange={props.handleChange}
                    value={brand}
                >
                    {brands.map((b) => {
                        return (
                            <option key={b} value={b}>{b}</option>
                        )
                    })}
                </select>
            </div>

            <div className="form-group">
                <label>Parent Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={props.handleCategoryChange} 
                    value={category._id}
                >
                    <option> {category ? category.name : "Please Select"}</option>
                    {
                        props.categories.length > 0 &&
                        props.categories.map((c) => {
                            return (
                                c.name !== category.name && <option key={c._id} value={c._id} >{c.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className='form-group'>
                <label >Sub Categories</label>
                <Select mode="multiple" style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={props.arrayOfSubIds}
                    onChange={(value) => props.setArrayOfSubIds(value)}
                >
                    {props.subOptions.length &&
                        props.subOptions.map((s) => {
                            return (<Option key={s._id} value={s._id}>{s.name}</Option>)
                        })
                    }

                </Select>
            </div>



            <br /> 

            <button
                type="submit"
                className="btn btn-primary btn-lg w-30 shadow-lg rounded-pill px-4 py-2 my-3"
            >{props.PlusCircleOutlined} &nbsp; Update</button>
        </form>
    )
}

export default ProductUpdateForm