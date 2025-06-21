import axios from "axios"


export const getProductsByCount = async (count) => {
    //console.log(`${process.env.REACT_APP_API}/products/${count}`);
    return axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}


export const getProduct = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/product/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const removeProduct = async (slug ,authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/product/${slug}`);
    return axios.delete(`${process.env.REACT_APP_API}/product/${slug}` , {
        headers : {
            authtoken ,
        }
    });
}

export const updateProduct = async (slug , product , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/product/${slug}`);
    return axios.put(`${process.env.REACT_APP_API}/product/${slug}` , product , {
        headers : {
            authtoken,
        }
    });
}

export const createProduct = async (product , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.post(`${process.env.REACT_APP_API}/product` , product ,  {
        headers : {
            authtoken , 
        }
    });
}