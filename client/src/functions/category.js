import axios from "axios"


export const getCategories = async () => {
    //console.log(`${process.env.REACT_APP_API}/categories`);
    return axios.get(`${process.env.REACT_APP_API}/categories`);
}


export const getCategory = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/category/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
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
    return axios.put(`${process.env.REACT_APP_API}/category/${slug}` , {
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