import React from 'react'
import { Card } from 'antd'
import noImage from '../../images/no2.png'
import {
    EditOutlined,
    DeleteOutlined
  } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product , handleRemove}) => {
    const { title, images, description, slug} = product;
    return (
        <Card cover={
            <img src={images && images.length ? images[0].url : noImage } style={{height: '150px', objectFit: 'cover'}} className='m-2 p-1' />
        } 
        actions={[
            <Link to={`/admin/product/${slug}`}>
                <EditOutlined className='text-warning'/>,
            </Link>,
            <DeleteOutlined className='text-danger'
                onClick={()=> handleRemove(slug)}
            />
        ]}
        >
            <Meta title={title}  description={description && description.substring(0,50).concat("...")}/>

        </Card>
    )
}

export default AdminProductCard