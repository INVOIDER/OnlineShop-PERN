import React from 'react';
import classes from "../styles/devices.module.css"
import FilterBar from "../components/filterBar";
import DeviceList from "../components/DeviceList";
const Devices = () => {
    return (
        <section className={classes.devices_Container}>
            <div className={classes.content_wrapper}>
                <FilterBar/>
                <DeviceList/>
            </div>
        </section>
    );
};

export default Devices;