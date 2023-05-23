import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import classes from "../styles/modal.module.css";
import InputLine from "./UI/input/InputLine";
import Btn from "./UI/button/Btn";

const CreateDevice = ({Active}) => {
    const [DeviceName, setDeviceName] = useState('');
    const [BrandName, setBrandName] = useState('');
    const [TypeName, setTypeName] = useState('');
    const [successMsg, setSuccessMsg] = useState('')
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const {device} = useContext(Context)
    useEffect(()=>{
        if(!Active){
            setDeviceName('')
            setSuccessMsg('')
            setAmount('')
            setDescription('')
            setBrandName('')
            setTypeName('')

        }
    },[Active])
    let handleNameChange = (e)=> {
        setDeviceName(e.target.value)
    };
    let handleAmountChange = (e)=> {
        setAmount(e.target.value)
    };
    let handleDescriptionChange = (e)=> {
        setDescription(e.target.value)
    };
    let handleBrandNameChange = (e)=> {
        setBrandName(e.target.value)
    };
    let handleTypeNameChange = (e)=> {
        setTypeName(e.target.value)
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log('Имя бренда:', DeviceName);
        console.log("Бренд: ",BrandName)
        console.log("Тип: ",TypeName)
        console.log("Изображение: ")
        console.log("Описание: ",description)
            setSuccessMsg('Тип был успешно добавлен!')
    };
return (
        <div>
            <div className={classes.modalName}>Добавление устройства</div>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                    <label htmlFor="typeSelect">Выберите тип</label>
                    <select className={classes.modalSelect} name="typeSelect" id="typeSelect">
                        {device.types.map(type =>
                            <option className={classes.modalOption} value={TypeName} onChange={handleTypeNameChange} key={type.id}>{type.name}</option>
                        )}
                    </select>
                    <label htmlFor="brandSelect">Выберите бренд </label>
                    <select className={classes.modalSelect} name="brandSelect" id="brandSelect">
                        {device.brands.map(brand =>
                            <option className={classes.modalOption} value={BrandName} onChange={handleBrandNameChange} key={brand.id}>{brand.name}</option>
                        )}
                    </select>
                    <label htmlFor="deviceName">Введите название </label>
                    <InputLine type="name" id="deviceName" value={DeviceName} onChange={handleNameChange} required placeholder="Название..."/>
                    <label htmlFor="amount">Введите колличество </label>
                    <InputLine type="number" id="amount" min="0" step="any"  value={amount} onChange={handleAmountChange} required placeholder="Колличество..."/>
                    <label htmlFor="file">Загрузите фотографию </label>
                    <InputLine type="file" id="file" accept="image/*"/>
                    <label htmlFor="brandSelect">Напишите описание товара </label>
                    <textarea rows='15' value={description} onChange={handleDescriptionChange} required placeholder="Описание..."></textarea>
                    <p className={classes.modalSuccess}>{successMsg ? successMsg : null}</p>
                    <div className={classes.submitBtn}>
                        <Btn style={{backgroundColor: 'green'}} type="submit" onClick={() => console.log('click')}>Добавить</Btn>
                    </div>
            </form>
        </div>
    );
};

export default CreateDevice;