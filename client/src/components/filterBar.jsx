import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../styles/filterbar.module.css";
import Btn from "./UI/button/Btn";

const FilterBar = observer(() => {
    const {device} = useContext(Context)
    const [typeName,setTypeName]= useState('')
    useEffect(()=> {
        device.types.map(type => {
            if(device.selectedType === type.id)
                setTypeName(type.name)
            }
        )
    },[device.selectedType])
const clearFilters = async ()=>{
        device.setSelectedBrand('')
}
    return (
        <div className={classes.filterbarContainer}>
            <div>
                <div className={classes.blockName}>
                    <img className={classes.Img} src={require ("../mediaSrc/devices/filter.png")} alt="Фильтр"/>{typeName}</div>
                <section className={classes.filterBlock}>
                    <div className={classes.SectionName}>Производители</div>
                    <ul>
                        {device.brands.map(brand =>
                            <li className="noselect" key={brand.id}>
                                <div className={device.selectedBrand === brand.id ?  classes.SectionElementActive : classes.SectionElement} id={"brandId_" + brand.id} onClick={()=> {device.setSelectedBrand(brand.id)}}>{brand.name}</div>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
            <div className={classes.clearBtn}><Btn onClick={clearFilters}>Очистить</Btn></div>

        </div>
    );
});

export default FilterBar;