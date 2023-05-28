import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {DEVICES_ROUTE} from "./utils/consts";
import classes from "../styles/selectTypes.module.css";
import {getTypes} from "../http/deviceAPI";

const SelectTypes = observer(({Active}) => {
    const {device} = useContext(Context)
    useEffect(()=>{
        getTypes().then(data=> device.setTypes(data))
    },[])

    return (
        <div>
            <ul className={classes.TypeSelector}>
            {device.types.map(type =>
                <li className={classes.TypeSelectorItem} key={type.id}>
                    <NavLink to={DEVICES_ROUTE}
                             className="noselect"
                             id={"type_" + type.id}
                             onClick={()=> {device.setSelectedType(type.id); Active(false)}}>
                        {type.name}
                    </NavLink>
                </li>
            )}
        </ul>
        </div>
    );
});

export default SelectTypes;