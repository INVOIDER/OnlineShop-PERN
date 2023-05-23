import React, {useContext, useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import classes from "../styles/header.module.css"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICES_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "./utils/consts";

/**
 * Header страницы. Содержит логотип и навигационную панель
 * @param props Имя пользователя
 * @returns {JSX.Element}
 * @constructor
 */
const Header = observer(() => {
    const [isBurger, setIsBurger] = useState(false)
    const {user} = useContext(Context)

    const burgerMenuHandler = () =>{
        setIsBurger(!isBurger)
    }
    let isAdmin = (user.role === "Admin")
    isAdmin = true //Заглушка
    return (
        <header className={classes.header}>
            <div >
                <Link to={SHOP_ROUTE}><img src={require ("../mediaSrc/header/logo.png")} alt="Device division"/></Link>
            </div>
            <div className={isBurger ? classes.navbarBurger : classes.navbar}>
                <NavLink to={DEVICES_ROUTE}>
                <div className= {classes.categories}>
                    <img src={require ("../mediaSrc/header/categories.png")} alt="Categories"/> <span className={classes.span}>Девайсы</span>
                </div></NavLink>
                {user.isAuth ?
                    <ul className={classes.ul}>
                        <li className={classes.li}><NavLink to={PROFILE_ROUTE}>
                            <div className={classes.navBlock}>
                                <img src={require ("../mediaSrc/header/user.png")} alt="User"/>
                                <span>User</span>
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
        </header>
    );
});

export default Header;