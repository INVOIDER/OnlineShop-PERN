import React, {useContext, useEffect} from 'react';
import classes from "../styles/devices.module.css"
import FilterBar from "../components/filterBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {getBrands, getDevices, getTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
const Devices = observer(() => {
    const {device} = useContext(Context)
    useEffect(()=>{
        getTypes().then(data=> device.setTypes(data))
        getBrands().then(data=> device.setBrands(data))
        getDevices(null,null,1,3).then(data=>{
            device.setDevices(data)
            device.setTotalCount(data[0].count)
        })
    },[])

    useEffect(()=> {
        getDevices(device.selectedType,device.selectedBrand,device.page,3).then(data=> {
            device.setDevices(data)
            device.setTotalCount(data[0]?.count || 0)
        })
    }, [device.page, device.selectedType, device.selectedBrand])
    return (
        <section className={classes.devices_Container}>
            <div className={classes.content_wrapper}>
                <FilterBar/>
                <DeviceList/>
                <Pages/>
            </div>
        </section>
    );
});

export default Devices;