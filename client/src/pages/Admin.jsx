import React, {useState} from 'react';
import classes from "../styles/admin.module.css";
import Modal from "../components/Modal";
import Btn from "../components/UI/button/Btn";
import CreateBrand from "../components/createBrand";
import CreateType from "../components/createType";
import CreateDevice from "../components/createDevice";

const Admin = () => {
    const [addTypeActive, setAddTypeActive] = useState(false)
    const [addBrandActive, setAddBrandActive] = useState(false)
    const [addDeviceActive, setAddDeviceActive] = useState(false)
    return (
        <div className={classes.adminPage}>
            <div className={classes.pageName}>Панель администратора</div>
            <div className={classes.adminContent}>
                <div className={classes.adminSection}>
                    <div className={classes.sectionName}>Добавление новых данных</div>
                    <ul className={classes.sectionContent}>
                            <li><Btn onClick={()=>{setAddBrandActive(true)}}>Добавить бренд</Btn></li>
                            <li><Btn onClick={()=>{setAddTypeActive(true)}}>Добавить тип</Btn></li>
                            <li><Btn onClick={()=>{setAddDeviceActive(true)}}>Добавить девайс</Btn></li>
                    </ul>
                </div>
            </div>
            <Modal  active={addBrandActive} setActive={setAddBrandActive}><CreateBrand Active={addBrandActive}/></Modal>
            <Modal  active={addTypeActive} setActive={setAddTypeActive}><CreateType Active={addTypeActive}/></Modal>
            <Modal  active={addDeviceActive} setActive={setAddDeviceActive}><CreateDevice Active={addDeviceActive}/></Modal>
        </div>
    );
};

export default Admin;