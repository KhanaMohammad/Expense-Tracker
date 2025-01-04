import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const LoginAPI = async({email , password})=>{
    const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password
    })

    // Return a promise.
    return response.data;
}


export const RegisterAPI = async({email , password, username})=>{
    const response = await axios.post(`${BASE_URL}/user/register`, {
        email,
        password,
        username
    })

    // Return a promise.
    return response.data;
}

//! Get token
const token = getUserFromLocalStorage()
export const updateProfiledAPI = async({email , username})=>{
    const response = await axios.put(`${BASE_URL}/user/update-profile`, {
       email,
       username
    },{
        headers:{
            Authorization : `khan ${token}`
        }
    })
    // Return a promise.
    return response.data;
}

export const changePasswordAPI = async(  newPassword)=>{
    const response = await axios.put(`${BASE_URL}/user/change-password`, {
       newPassword
    },{
        headers:{
            Authorization : `khan ${token}`
        }
    })
    // Return a promise.
    return response.data;
}
