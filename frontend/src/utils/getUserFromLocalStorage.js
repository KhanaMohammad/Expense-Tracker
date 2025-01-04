
export const getUserFromLocalStorage = ()=>{
   const token = JSON.parse(localStorage.getItem("userInfo"));
   return token?.token;
}