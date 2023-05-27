import React from 'react';
import classes from "../styles/deviceItem.module.css";
import Btn from "./UI/button/Btn";
import { useNavigate } from 'react-router-dom';
import {DEVICES_ROUTE} from "./utils/consts";
const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(DEVICES_ROUTE +'/' + device.id)
    }
    const handleBuy = ()=>{
        console.log("Товар",device.name, " был успешно добавлен в корзину")
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
                        <Btn oncLick={handleBuy}>Добавить в корзину</Btn>
                </div>

        </div>
    );
};

export default DeviceItem;