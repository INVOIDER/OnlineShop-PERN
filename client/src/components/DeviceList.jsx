import React, {useContext} from 'react';
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import classes from "../styles/deviceList.module.css";

const DeviceList = () => {
    const {device} = useContext(Context)
    return (
        <div className={classes.deviceList}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </div>
    );
};

export default DeviceList;