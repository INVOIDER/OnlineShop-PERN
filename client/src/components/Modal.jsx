import React from 'react';
import classes from "../styles/modal.module.css";
import Btn from "./UI/button/Btn";

/**
 * Универсальное модальное окно
 * @param children - компонент, который должен находиться в модальном окне
 * @param active - состояние модального окна
 * @param setActive - функция изменения состояния модального окна
 * @returns {JSX.Element}
 * @constructor
 */
const Modal = ({children,active,setActive}) => {
    return (
        <div className={active ? classes.modalActive : classes.modalClosed} onClick={()=> setActive(false)}>
            <div className={classes.modalBody} onClick={e=> e.stopPropagation()}>
                <div className={classes.modalFooter}>
                    {children}
                    <div className={classes.modalCloseBtn}><Btn  style={{backgroundColor: 'red'}} onClick={()=> setActive(false)}>Закрыть</Btn></div>
                </div>
            </div>
        </div>
    );
};

export default Modal;