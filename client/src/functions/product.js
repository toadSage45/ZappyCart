import axios from "axios"


export const getProductsByCount = async (count) => {
    //console.log(`${process.env.REACT_APP_API}/products/${count}`);
    return axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}


export const getCategory = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const removeProduct = async (slug ,authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/product/${slug}`);
    return axios.delete(`${process.env.REACT_APP_API}/product/${slug}` , {
        headers : {
            authtoken ,
        }
    });
}

export const updateCategory = async (slug , category , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.put(`${process.env.REACT_APP_API}/category/${slug}` , category , {
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