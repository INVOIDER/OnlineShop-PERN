import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

/**
 * Функция проверяет, вошел ли пользователь в систему, и перенаправляет его на страницу авторизации, если он этого не сделал
 * @param children компонент, который загрузится, при успешной проверке
 * @returns {*|JSX.Element} компонент, который загрузится, при успешной проверке
 * @constructor
 */
const AuthChecker = ({children}) => {
    const location = useLocation();
    const auth = false //Заглушка пока не добавлю сервер
    if(!auth){
        return <Navigate to='/login' state={{from: location}}/>
    }
    return children
};

export default AuthChecker;