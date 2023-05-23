import React, {useState} from 'react';
import auth from "../styles/Auth.module.css"
import InputLine from "../components/UI/input/InputLine";
import Btn from "../components/UI/button/Btn";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../components/utils/consts";

/**
 * Компонент авторизации/регистрации
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [error, setError] = useState('');

    const isLogin = window.location.pathname === LOGIN_ROUTE; //Проверка текущей ссылки
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    };
    /**
     * Данная функция запускается при отправке формы
     * @param e
     */
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(name,surname)
        if (!/[A-Za-zА-Яа-яЁё]/.test(name) && name) {
            setError('Имя пользователя должно состоять из букв!');
        }else if(!/[A-Za-zА-Яа-яЁё]/.test(surname) && surname) {
            setError('Фамилия пользователя должна состоять из букв!');
        }else
            {
                // отправляем данные на сервер или выполняем другие действия
                console.log('Имя пользователя:', name);
                unsetVars()
            }
    };

    /**
     * Данная функция очищает переменные формы
     */
    const unsetVars =()=>{
        setEmail('');
        setPassword('')
        setName('');
        setSurname('');
        setError('');
    }
return (
        <section className={auth.Auth}>
            {isLogin ? <h1>Авторизация</h1> : <h1>Регистрация</h1>}
            {isLogin ?
                <form className={auth.inputForm} onSubmit={handleSubmit}>
                    <div className={auth.inputBlock}>
                        <InputLine type="email" id="userEmail" value={email} onChange={handleEmailChange} required placeholder="Введите email..."/>
                        <InputLine type="password" id="userPassword" value={password} onChange={handlePasswordChange} required placeholder="Введите пароль..."/>
                        {error ? <p className={auth.error}>{error}</p> : null}
                    </div>
                    <div className={auth.authButtons}>
                        <Btn type="submit">Войти</Btn>
                        <div className={auth.anotherOption}>
                            <p className={auth.notice}>Нет аккаунта?</p>
                            <Link className={auth.Link} onClick={unsetVars} to='/registration'>Зарегистрироваться</Link>
                        </div>

                    </div>
                </form>
            :
                <form className={auth.inputForm} onSubmit={handleSubmit}>
                    <div className={auth.inputBlock}>
                        <InputLine type="email" id="userEmail" value={email} onChange={handleEmailChange} required placeholder="Введите email..."/>
                        <InputLine type="password" id="userPassword" value={password} onChange={handlePasswordChange} required placeholder="Введите пароль..."/>
                        <InputLine type="name" id="nameReg" value={name} onChange={handleNameChange} required placeholder="Введите имя..."/>
                        <InputLine type="name" id="surnameReg" value={surname} onChange={handleSurnameChange} placeholder="Введите фамилию..."/>
                        {error ? <p className={auth.error}>{error}</p> : null}
                    </div>
                    <div className={auth.authButtons}>
                    <Btn type="submit">Зарегистрироваться</Btn>
                        <div className={auth.anotherOption}>
                            <p className={auth.notice}>Уже есть аккаунт?</p>
                            <Link className={auth.Link} onClick={unsetVars} to='/login'>Войти</Link>
                        </div>
                    </div>
                </form>
            }
        </section>
    );
};

export default Auth;