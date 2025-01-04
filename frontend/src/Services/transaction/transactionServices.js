import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//! Add
export const addTransactionAPI = async({ type , amount , category, description, date})=>{
    const response = await axios.post(`${BASE_URL}/transaction/add`, {
        amount,
        type,
        category,
        date,
        description
    },{
        headers : {
            Authorization :`khan ${token}`
         }})

    // Return a promise.
    return response.data;
}
//! Update
export const updateTransactionAPI = async({name , type, id})=>{
   
    const response = await axios.put(`${BASE_URL}/transaction/update/${id}`, {
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
export const ListTransactionAPI = async({type, startDate, endDate , category})=>{
    const response = await axios.get(`${BASE_URL}/transaction/lists`, {
        params:{
            type,
             startDate,
              endDate , 
              category
        },
      headers : {
                Authorization :`khan ${token}`
      }
    })

    // Return a promise.
    return response.data;
}
