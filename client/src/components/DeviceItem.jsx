import React, {useContext} from 'react';
import classes from "../styles/deviceItem.module.css";
import Btn from "./UI/button/Btn";
import { useNavigate } from 'react-router-dom';
import {DEVICES_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import {addToCart} from "../http/cartAPI";
import {Context} from "../index";
const DeviceItem = ({device}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(DEVICES_ROUTE +'/' + device.id)
    }
    const handleBuy = async ()=>{
        if(user.isAuth){
            await addToCart(device.id).then(console.log("Товар",device.name, " был успешно добавлен в корзину"))
        }else{
            navigate(LOGIN_ROUTE)
        }

    }
    return (
        <div className={classes.deviceItem}>
            <div className={classes.deviceImg}  onClick={handleClick}>
                <img className={classes.Img} src={process.env.REACT_APP_API_URL + device.img} alt={device.name} title={device.name}/>
            </div>
            <div className={classes.deviceName} onClick={handleClick} title={device.name}>{device.name}</div>
            <div className={classes.devicePrice}>{device.price} р.</div>
                <div className={classes.deviceAmount}>{device.amount > 0 ? <p className={classes.available}>В наличии</p> : <p className={classes.notAvailable}>Нет в наличии</p>}</div>
                <div className={device.amount > 0 ? classes.deviceBuyBtn : classes.hidden}>
                        <Btn onClick={handleBuy}>Добавить в корзину</Btn>
                </div>
        </div>
    );
};

export default DeviceItem;