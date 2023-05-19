import React from 'react';
import {Routes, Route} from "react-router-dom"
import ErrorPage from "../pages/ErrorPage";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REG_ROUTE} from "./utils/consts";
import Main from "../pages/main";
import AuthChecker from "./AuthChecker";
import Auth from "../pages/auth";

/**
 * Данный компонент загружает вместо себя нужные страницы
 * @returns {JSX.Element}
 * @constructor
 */
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path={LOGIN_ROUTE} element={<Auth/>}/>
            <Route path={REG_ROUTE} element={<Auth/>}/>
            <Route path={ADMIN_ROUTE} element= {<AuthChecker><ErrorPage/></AuthChecker>}/>
            <Route path={BASKET_ROUTE} element= {<AuthChecker><ErrorPage/></AuthChecker>}/>
            <Route path={PROFILE_ROUTE} element= {<AuthChecker><ErrorPage/></AuthChecker>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>

    );
};

export default AppRouter;