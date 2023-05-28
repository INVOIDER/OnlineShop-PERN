import React, {useContext} from 'react';
import {Context} from "../index";
import {Navigate} from "react-router-dom";
import {SHOP_ROUTE} from "./utils/consts";

const AdminChecker = ({children}) => {
    const {user} = useContext(Context)
    let isAdmin = (user.user.data?.role ?  user.user.data.role === "Admin" :false)

    if (!isAdmin){
        return <Navigate to={SHOP_ROUTE}/>
    }else{
        return children
    }
};

export default AdminChecker;