import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//! Add
export const addCatagoryAPI = async({name , type})=>{
    const response = await axios.post(`${BASE_URL}/catagory/create`, {
        name,
        type
    },{
        headers : {
            Authorization :`khan ${token}`
         }})

    // Return a promise.
    return response.data;
}
//! Update
export const updateCatagoryAPI = async({name , type, id})=>{
   
    const response = await axios.put(`${BASE_URL}/catagory/update/${id}`, {
        name,
        type
    },{
        headers : {
            Authorization :`khan ${token}`
         }})

    // Return a promise.
    return response.data;
}
//! Delete
export const deleteCatagoryAPI = async(id)=>{
   
    const response = await axios.delete(`${BASE_URL}/catagory/delete/${id}`, {
        headers : {
            Authorization :`khan ${token}`
         }})

    // Return a promise.
    return response.data;
}

//! get token from local storage.
const token = getUserFromLocalStorage();
export const ListAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/catagory/lists`, {
      headers : {
                Authorization :`khan ${token}`
      }
    })

    // Return a promise.
    return response.data;
}
