import React, {useContext} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {Context} from "../index";
import {LOGIN_ROUTE} from "./utils/consts";

/**
 * Функция проверяет, вошел ли пользователь в систему, и перенаправляет его на страницу авторизации, если он этого не сделал
 * @param children компонент, который загрузится, при успешной проверке
 * @returns {*|JSX.Element} компонент, который загрузится, при успешной проверке
 * @constructor
 */
const AuthChecker = ({children}) => {
    const location = useLocation();

    const {user} = useContext(Context)

    if(!user.isAuth){
        return <Navigate to={LOGIN_ROUTE} state={{from: location}}/>
    }
    return children
};

export default AuthChecker;