import axios from "axios"


export const getSubs = async () => {
    //console.log(`${process.env.REACT_APP_API}/subs`);
    return axios.get(`${process.env.REACT_APP_API}/subs`);
}


export const getSub = async (slug) => {
    //console.log(`${process.env.REACT_APP_API}/sub/${slug}`);
    return axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
}

export const removeSub = async (slug ,authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/sub/${slug}`);
    return axios.delete(`${process.env.REACT_APP_API}/sub/${slug}` , {
        headers : {
            authtoken ,
        }
    });
}

export const updateSub = async (slug , sub , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/sub/${slug}`);
    return axios.put(`${process.env.REACT_APP_API}/sub/${slug}` , sub , {
        headers : {
            authtoken,
        }
    });
}

export const createSub = async (sub , authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/sub/${slug}`);
    return axios.post(`${process.env.REACT_APP_API}/sub` , sub ,  {
        headers : {
            authtoken , 
        }
    });
}