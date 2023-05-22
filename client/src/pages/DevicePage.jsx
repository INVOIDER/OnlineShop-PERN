import React from 'react';
import classes from "../styles/DevicePage.module.css";
import Btn from "../components/UI/button/Btn";

const DevicePage = () => {
    const device = {id:5, name: 'Смартфон Xiaomi Redmi Note 11 Pro 5G 8/128 ГБ RU, Dual nano SIM, серый графит',brandID:3, typeID:1, price: 20000,amount:10, img: 'e8aae01f-8091-4d25-bb73-687b0fd6b41a.jpg', description: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    const handleBuy = async ()=>{
        await console.log(device.name," добавлен в корзину")
    }
    return (
        <div className={classes.devicePage}>
            <div className={classes.deviceName}>{device.name}</div>
            <div className={classes.deviceImg}><img className={classes.Img} src="https://avatars.mds.yandex.net/get-mpic/4615030/img_id6990483609829537403.jpeg/orig" alt={device.name}/></div>
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