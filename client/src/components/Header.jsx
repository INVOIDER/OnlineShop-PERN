import React from 'react';
import {Link} from "react-router-dom";
import "../styles/header.css"
import {observer} from "mobx-react-lite";

/**
 * Header страницы. Содержит логотип и навигационную панель
 * @param props Имя пользователя
 * @returns {JSX.Element}
 * @constructor
 */
const Header = observer(() => {
    let username
    return (
        <header className="header">
            <div className="left-nav">
                <Link to="/"><img src={require ("../mediaSrc/header/logo.png")} alt="Device division"/></Link>
                <div className="categories">
                    <Link to="/devices">Девайсы</Link>
                </div>
            </div>
            <nav className="navbar">
                {username ?
                    <ul>
                        <li><Link to='/profile'>
                            <div className="nav-block">
                                <img src={require ("../mediaSrc/header/user.png")} alt="User"/>
                                <span>{username}</span>
                            </div>
                        </Link></li>
                        <li><Link to='/cart'>
                            <div className="nav-block">
                                <img src={require ("../mediaSrc/header/shopping_cart.png")} alt="cart"/>
                                <span>Корзина</span>
                            </div>
                            </Link></li>
                    </ul>
                    :
                    <ul>
                        <li><Link to='/login'>Войти</Link></li>
                    </ul>
                }
            </nav>
        </header>
    );
});

export default Header;