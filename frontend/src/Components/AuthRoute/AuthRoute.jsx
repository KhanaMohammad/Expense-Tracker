
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/getUserFromLocalStorage";

const AuthRoute = ({ children }) => {
    const token = getUserFromLocalStorage();
    if (token) {
        return children;
    }else{
        return <Navigate to="/login"/> ;
    }
};

export default AuthRoute;