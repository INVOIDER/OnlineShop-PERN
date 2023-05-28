import React, {useContext, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import classes from "../styles/header.module.css"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "./utils/consts";
import SelectTypes from "./selectTypes";

/**
 * Header страницы. Содержит логотип и навигационную панель
 * @param props Имя пользователя
 * @returns {JSX.Element}
 * @constructor
 */
const Header = observer(() => {
    const [isBurger, setIsBurger] = useState(false);
    const [selectTypeActive, setSelectTypeActive] = useState(false)

    const {user} = useContext(Context)
    console.log("Вы - ",user.user.data.role)
    let navigate = useNavigate();
    const burgerMenuHandler = () =>{
        setIsBurger(!isBurger)
    }
    /**
     * Функция выхода из аккаунта
     * @constructor
     */
    const LogOut = ()=>{
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }
    let isAdmin = (user.user.data?.role ?  user.user.data.role === "Admin" :false)
    return (
        <header className={classes.header}>
            <div >
                <Link to={SHOP_ROUTE}><img src={require ("../mediaSrc/header/logo.png")} alt="Device division"/></Link>
            </div>
            <div className={isBurger ? classes.navbarBurger : classes.navbar}>
                        <div className= {classes.categories} onClick={()=>setSelectTypeActive(true)}>
                            <img src={require ("../mediaSrc/header/categories.png")} alt="Categories"/>
                            <span className={classes.span}>Девайсы</span>
                        </div>


                {user.isAuth ?
                    <ul className={classes.ul}>
                        <li className={classes.li} onClick={LogOut}>Выйти</li>

                        <li className={classes.li}><NavLink to={PROFILE_ROUTE}>
                            <div className={classes.navBlock}>
                                <img src={require ("../mediaSrc/header/user.png")} alt="User"/>
                                <span>{user.user.data.name}</span>
                            </div>
                        </NavLink></li>
                        {isAdmin ?
                            <li className={classes.li}><NavLink to={ADMIN_ROUTE}>
                                <div className={classes.navBlock}>
                                    <img src={require ("../mediaSrc/header/admin.png")} alt="Admin"/>
                                    <span>Админ панель</span>
                                </div>
                            </NavLink></li>
                            :
                            <li className={classes.li}><NavLink to={BASKET_ROUTE}>
                                <div className={classes.navBlock}>
                                    <img src={require ("../mediaSrc/header/shopping_cart.png")} alt="cart"/>
                                    <span>Корзина</span>
                                </div>
                            </NavLink></li>
                        }
                    </ul>
                    :
                    <ul className={classes.ul}>
                        <li className={classes.li}><NavLink to={LOGIN_ROUTE}><span>Войти</span></NavLink></li>
                    </ul>
                }
            </div>
            <div className={classes.navBurgerBtn} onClick={burgerMenuHandler}>
                <img src={require("../mediaSrc/header/burger.png") } alt="burger"/>
            </div>

            <div className={selectTypeActive ? classes.TypeSelectorActive : classes.TypeSelectorClosed} onClick={()=> {setSelectTypeActive(false); console.log('SelectType is: ',selectTypeActive)}}>
                <div className={classes.modalBody} onClick={e=> e.stopPropagation()}>
                    <SelectTypes Active={setSelectTypeActive}/>
                </div>
            </div>
        </header>
    );
});

export default Header;