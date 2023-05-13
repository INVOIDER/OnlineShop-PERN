import React from 'react';
import {Link} from "react-router-dom";
import Style from "../styles/header.css"

/**
 * Header страницы. Содержит логотип и навигационную панель
 * @param props Имя пользователя
 * @returns {JSX.Element}
 * @constructor
 */
const Header = (props) => {
    console.log(props)
    return (
        <header className="header">
            <div className="logo">
                <Link to="/"><img src={require ("../mediaSrc/header/logo.png")} alt="Device division"/></Link>
            </div>
            <nav className="navbar">
                {props.username ?
                    <ul>
                        <li><Link to='/user/profile'>
                            <div className="nav block">
                                <img src={require ("../mediaSrc/header/user.png")} alt="User"/>
                                <span>{props.username}</span>
                            </div>
                        </Link></li>
                        <li><Link to='/user/cart'>
                            <div className="nav-block">
                                <img src={require ("../mediaSrc/header/shopping_cart.png")} alt="cart"/>
                                <span>Корзина</span>
                            </div>
                            </Link></li>
                    </ul>
                    :
                    <ul>
                        <li><Link to='/user/profile'>Войти</Link></li>
                    </ul>
                }

            </nav>
        </header>
    );
};

export default Header;