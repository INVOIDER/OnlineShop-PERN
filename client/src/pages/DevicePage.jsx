import React, {useEffect, useState} from 'react';
import classes from "../styles/DevicePage.module.css";
import Btn from "../components/UI/button/Btn";
import {useParams} from "react-router-dom";
import {getOneDevice} from "../http/deviceAPI";
import {addToCart} from "../http/cartAPI";

const DevicePage = () => {
    const [device,setDevice] = useState({})
    const {id} =useParams()
    useEffect(()=>{
        getOneDevice(id).then(data=> setDevice(data))
        console.log(device[0])
    },[])
    const handleBuy = async ()=>{
        console.log(device.id)
        await addToCart(device.id).then(console.log("Товар",device.name, " был успешно добавлен в корзину"))
    }
    return (
        <div className={classes.devicePage}>
            <div className={classes.deviceName}>{device.name}</div>
            <div className={classes.deviceImg}><img className={classes.Img} src={process.env.REACT_APP_API_URL + device.img} alt={device.name}/></div>
            <div className={classes.deviceBuyBlock}>
                <div className={classes.devicePrice}>{device.price} р.</div>
                <div className={classes.deviceAmount}>
                    {device.amount > 0 ? <p>В наличии ✅</p> : <p>Нет в наличии ❌</p>}
                </div>
                {device.amount > 0 ?
                    <div className={classes.deviceBuyButton}><Btn onClick={handleBuy}>Добавить в корзину</Btn></div>
                    :
                    ""
                }
            </div>

            <div className={classes.deviceDesc}>
                <hr/>
                <h1>Описание</h1>
                {device.description}
            </div>
        </div>
    );
};

export default DevicePage;