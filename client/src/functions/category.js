import axios from "axios"


export const getCategories = async () => {
    //console.log(`${process.env.REACT_APP_API}/categories`);
    return axios.get(`${process.env.REACT_APP_API}/categories`);
}


export const getCategory = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const getProductsFromCategory = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/categoryProduct/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/categoryProduct/${slug}`);
}

export const removeCategory = async (slug ,authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.delete(`${process.env.REACT_APP_API}/category/${slug}` , {
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

export const createCategory = async (category , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.post(`${process.env.REACT_APP_API}/category` , category ,  {
        headers : {
            authtoken , 
        }
    });
}
export const getCategorySubs = async (_id) => {
    return axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
}