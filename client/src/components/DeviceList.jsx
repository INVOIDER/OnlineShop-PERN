import React, {useContext} from 'react';
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import classes from "../styles/deviceList.module.css";
import {observer} from "mobx-react-lite";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    let isEmpty = device.totalCount === 0
    return (

            <div className={classes.deviceList}>
                {!isEmpty ?
                device.devices.map(device =>
                    <DeviceItem key={device.id} device={device}/>
                )
                    :
                    <p>Таких товаров пока что нет :(</p>
                }
            </div>
    );
});

export default DeviceList;