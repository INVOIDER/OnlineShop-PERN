import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import classes from "../styles/cartPage.module.css";
import {deleteAll, deleteItem, deleteOne, getCart, updateOne} from "../http/cartAPI";
import Btn from "../components/UI/button/Btn";
import {observer} from "mobx-react-lite";


const CartPage = observer(() => {
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)
    const fetchData =async ()=>{
        const data = await getCart()
        const copyData = Object.assign([], data); // или const copyData = [...data];
        await user.setCart(copyData);
    };

    useEffect(()=>{
        console.log('UseEffect изменен')
        fetchData()
    },[])
    const deleteDevice = async (id)=>{
        console.log('Вызвана')
        await deleteItem(id)
        await fetchData()
    }
    const deleteOneItem = async (id,amount)=>
    {
        if(amount<=1){
            console.log('Current amount ',amount, ' it is less')
            await deleteDevice(id)
            await fetchData()
        }else{
            console.log('Current amount ',amount, ' it is more')
            await deleteOne(id)
            await fetchData()
        }
    }
    const addDevice = async (id)=>{
        await updateOne(id)
        await fetchData()
    }
    const deleteCart = async ()=>{
        console.log('Удаляю...')
        console.log('user cart До удаления: ', user.cart)
        await deleteAll().then(user.setCart([]))
        console.log('user cart после удаления: ', user.cart)
    }
    return (
        <div className={classes.cartPageWrapper}>
            {Object.keys(user.cart).length <=0 ?
            <div className={classes.cartEmpty}>Ваша корзина пуста</div>
                :
            <div className={classes.cartSection}>
                {user.cart.map(device =>
                    <div className={classes.deviceItem} key={device.id}>
                        <div className={classes.deviceImg}><img className={classes.Img} src={process.env.REACT_APP_API_URL + device.img} alt={device.name} title={device.name}/></div>
                        <div className={classes.deviceName}>{device.name}</div>
                        <div className={classes.devicePrice}>{device.price * device.quantity} р.</div>
                        <div className={classes.deleteBtn}><Btn id={device.id + "_delete"} onClick={()=>deleteDevice(device.id)}>Удалить</Btn></div>
                        <div className={classes.amountBlock}>
                            <div className={classes.amountChangers}>
                                <Btn id={device.id + "_add"} onClick={()=>addDevice(device.id)}>+</Btn>
                                <Btn id={device.id + "_reduce"} onClick={()=>deleteOneItem(device.id,device.quantity)}>-</Btn></div>
                            <div>{device.quantity}</div>
                        </div>
                    </div>
                )}
                <div className={classes.cartBtns}>
                    <Btn onClick={deleteCart}>Очистить корзину</Btn>
                </div>
            </div>
            }
        </div>
    );
});

export default CartPage;