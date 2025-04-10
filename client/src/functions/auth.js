import axios from "axios"


export const createOrUpdateUser =  async (authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/create-or-update-user`);
    return axios.post(`${process.env.REACT_APP_API}/create-or-update-user` , {} , {
      headers : {
        authtoken, 
      }
    })
  }

  export const currentUser =  async (authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/current-user`);
    return axios.post(`${process.env.REACT_APP_API}/current-user` , {} , {
      headers : {
        authtoken, 
      }
    })
  }

  export const currentAdmin =  async (authtoken) => {
    //console.log(`${process.env.REACT_APP_API}/current-user`);
    return axios.post(`${process.env.REACT_APP_API}/current-admin` , {} , {
      headers : {
        authtoken, 
      }
    })
  }