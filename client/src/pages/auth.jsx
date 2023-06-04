import React, {useContext, useState} from 'react';
import auth from "../styles/Auth.module.css"
import InputLine from "../components/UI/input/InputLine";
import Btn from "../components/UI/button/Btn";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../components/utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

/**
 * Компонент авторизации/регистрации
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [error, setError] = useState('');
    let navigate = useNavigate();
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

    const signIn = async () =>{
        try{
            let data;
            if(isLogin){
                console.log('Вход')
                data = await login(email,password);
                console.log(data)
            }else{
                data = await registration(email,password,name,surname);
                console.log(data)
            }
            user.setUser({data})
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }catch (e){
            setError(e.response.data.message)
        }

    }
    /**
     * Данная функция запускается при отправке формы
     * @param e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/[A-Za-zА-Яа-яЁё]/.test(name) && name) {
            setError('Имя пользователя должно состоять из букв!');
        }else if(!/[A-Za-zА-Яа-яЁё]/.test(surname) && surname) {
            setError('Фамилия пользователя должна состоять из букв!');
        }else
            {
                // отправляем данные на сервер или выполняем другие действия
                console.log('Email пользователя:', email);
                await signIn().then(r => console.log('Пользователь успешно создан'))

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
    <div className={auth.AuthPage}>
        <section className={auth.Auth}>
            {isLogin ? <h1>Авторизация</h1> : <h1>Регистрация</h1>}
            {isLogin ?
                <form className={auth.inputForm}>
                    <div className={auth.inputBlock}>
                        <InputLine type="email" id="userEmail" value={email} onChange={handleEmailChange} required placeholder="Введите email..."/>
                        <InputLine type="password" id="userPassword" value={password} onChange={handlePasswordChange} required placeholder="Введите пароль..."/>
                        {error ? <p className={auth.error}>{error}</p> : null}
                    </div>
                    <div className={auth.authButtons}>
                        <Btn type="submit" onClick={handleSubmit}>Войти</Btn>
                        <div className={auth.anotherOption}>
                            <p className={auth.notice}>Нет аккаунта?</p>
                            <Link className={auth.Link} onClick={unsetVars} to='/registration'>Зарегистрироваться</Link>
                        </div>
                    </div>
                </form>
                :
                <form onSubmit={handleSubmit} className={auth.inputForm} >
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
    </div>

    );
});

export default Auth;