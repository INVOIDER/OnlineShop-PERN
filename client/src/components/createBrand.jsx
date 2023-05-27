import React, {useEffect, useState} from 'react';
import InputLine from "./UI/input/InputLine";
import Btn from "./UI/button/Btn";
import classes from "../styles/modal.module.css";
import {createBrand} from "../http/deviceAPI";

const CreateBrand = ({Active}) => {
    const [name,setName] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('')

    const clearData = ()=>{
        setName('')
        setSuccessMsg('')
        setError('')
    }
    const addBrand = async ()=>{
        try{
            await createBrand({name:name})
            setError('')
            setSuccessMsg(`Бренд '${name}' был успешно добавлен!`)
        }catch (e){
            console.log(e.response.data.message)
            setSuccessMsg('')
            setError(e.response.data.message)

        }
    }
    useEffect(()=>{
        if(!Active){
            clearData()
        }
    },[Active])

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        if (!/[A-Za-zА-Яа-яЁё]/.test(name) && name) {
            setError('Название бренда должно состоять из букв!');
        }else
        {
            // отправляем данные на сервер или выполняем другие действия
            console.log('Имя бренда:', name);
            await addBrand()
        }
    };
    return (
        <div>
            <div className={classes.modalName}>Добавление производителя</div>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brandName"> Введите название брэнда</label>
                    <InputLine type="name" id="brandName" value={name} onChange={handleNameChange} required placeholder="Брэнд..."/>
                    {error ? <p className={classes.modalError}>{error}</p> : <p className={classes.modalSuccess}>{successMsg ? successMsg : null}</p>}
                </div>
                <div className={classes.submitBtn}>
                    <Btn style={{backgroundColor: 'green'}} type="submit" onClick={() => console.log('click')}>Добавить</Btn>
                </div>
            </form>
        </div>
    );
};

export default CreateBrand;