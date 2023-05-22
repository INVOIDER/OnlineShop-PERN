import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../styles/filterbar.module.css";
import Btn from "./UI/button/Btn";

const FilterBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className={classes.filterbarContainer}>
            <div className={classes.blockName}>
                <img className={classes.Img} src={require ("../mediaSrc/devices/filter.png")} alt="Фильтер"/>Фильтр</div>
            <section className={classes.filterBlock}>
                <h1>Производители</h1>
                <ul>
                {device.brands.map(brand =>
                    <li key={brand.id} className={classes.li}>
                        <label className="noselect">
                            <input type="checkbox" id={"brandId_" + brand.id}/>{brand.name}
                        </label>
                    </li>
                )}
                </ul>
            </section>
        </div>
    );
});

export default FilterBar;