import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import classes from "../styles/modal.module.css";
import InputLine from "./UI/input/InputLine";
import Btn from "./UI/button/Btn";
import {observer} from "mobx-react-lite";
import {createDevice, getBrands, getDevices, getTypes} from "../http/deviceAPI";

const CreateDevice = observer(({Active}) => {
    const [DeviceName, setDeviceName] = useState('');
    const [DevicePrice, setDevicePrice] = useState('');
    const [file,setFile] = useState(null)
    const [successMsg, setSuccessMsg] = useState('')
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const {device} = useContext(Context)
    useEffect(()=>{
        getTypes().then(data=> device.setTypes(data))
        getBrands().then(data=> device.setBrands(data))
    },[]);
    const clearData = ()=>{
        setDeviceName('')
        setSuccessMsg('')
        setAmount('')
        setDescription('')
        setFile(null)
        setError('')
    }
    useEffect(()=>{
        if(!Active){
            clearData()
        }
    },[Active]);

    let handleNameChange = (e)=> {
        setDeviceName(e.target.value)
    };
    let handleDevicePriceChange = (e)=> {
        setDevicePrice(Number(e.target.value))
    }
    let handleAmountChange = (e)=> {
        setAmount(Number(e.target.value))
    };
    let handleDescriptionChange = (e)=> {
        setDescription(e.target.value)
    };
    let handleTypeChange=(e)=>{
        console.log("Текущий тип",e.target.value)
        device.setSelectedType(e.target.value)
    }
    let handleBrandChange=(e)=>{
        console.log("Текущий Бренд",e.target.value)
        device.setSelectedBrand(e.target.value)
    }
    const handleFile = (e)=> {
        console.log('enter')
        console.log('FIle',e.target.files[0])
        setFile(e.target.files[0])

    }
    const addDevice = async ()=>{
        try{
            const formData = new FormData()
            formData.append('name',DeviceName)
            formData.append('typeID',Number(device.selectedType))
            formData.append('brandID',Number(device.selectedBrand))
            formData.append('price',DevicePrice)
            formData.append('amount',amount)
            formData.append('img',file)
            formData.append('description',description)
            await createDevice(formData).then(()=>setSuccessMsg(`Устройство было успешно добавлено!`))
        }catch (e){
            setError(e.response.data)
        }
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Имя бренда:', DeviceName);
        console.log("Бренд: ",device.selectedType)
        console.log("Тип: ",device.selectedBrand)
        console.log("Изображение: ",file)
        console.log("Описание: ",description)
        await addDevice()
    };
return (
        <div>
            <div className={classes.modalName}>Добавление устройства</div>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                    <label htmlFor="typeSelect">Выберите тип</label>
                    <select className={classes.modalSelect} value={device.selectedType} onChange={handleTypeChange} name="typeSelect" id="typeSelect">
                        <option className={classes.modalOption} selected> {device.selectedType.name ? device.selectedType.name : "Выберете тип"}</option>
                        {device.types.map(type =>
                            <option className={classes.modalOption} value={type.id} key={type.id}>{type.name}</option>
                        )}
                    </select>
                <label htmlFor="brandSelect">Выберите бренд </label>
                <select className={classes.modalSelect}  value={device.selectedBrand} onChange={handleBrandChange} name="brandSelect" id="brandSelect">
                    <option className={classes.modalOption} selected> {device.selectedBrand.name ? device.selectedBrand.name : "Выберете бренд"}</option>
                    {device.brands.map(brand =>
                        <option className={classes.modalOption} key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    )}
                </select>
                    <label htmlFor="deviceName">Введите название </label>
                    <InputLine type="name" id="deviceName" value={DeviceName} onChange={handleNameChange} required placeholder="Название..."/>
                    <label htmlFor="devicePrice">Введите цену </label>
                    <InputLine type="text" id="devicePrice" value={DevicePrice} onChange={handleDevicePriceChange} required placeholder="Цена..."/>
                    <label htmlFor="amount">Введите колличество </label>
                    <InputLine type="number" id="amount" min="0" step="any"  value={amount} onChange={handleAmountChange} required placeholder="Колличество..."/>
                    <label htmlFor="file">Загрузите фотографию </label>
                    <InputLine type="file" id="file" onChange={handleFile}/>
                    <label htmlFor="description">Напишите описание товара </label>
                    <textarea rows='5' value={description} id="description" onChange={handleDescriptionChange} placeholder="Описание..."></textarea>
                    {error ? <p className={classes.modalError}>{error}</p> : <p className={classes.modalSuccess}>{successMsg ? successMsg : null}</p>}
                    <div className={classes.submitBtn}>
                        <Btn style={{backgroundColor: 'green'}} type="submit">Добавить</Btn>
                    </div>
            </form>
        </div>
    );
});

export default CreateDevice;