import React, {useEffect, useState} from 'react';
import InputLine from "./UI/input/InputLine";
import Btn from "./UI/button/Btn";
import classes from "../styles/modal.module.css";
import {createType} from "../http/deviceAPI";

const CreateType = ({Active}) => {
    const [name,setName] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('')

    const clearData = ()=>{
        setName('')
        setSuccessMsg('')
        setError('')
    }

    useEffect(()=>{
        if(!Active){
            clearData()
        }
    },[Active])
    const addType = async ()=>{
        try{
            await createType({name:name})
            setError('')
            setSuccessMsg(`Тип ${name} был успешно добавлен!`)
        }catch (e){
            console.log(e.response.data.message)
            setSuccessMsg('')
            setError(e.response.data.message)

        }
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        if (!/[A-Za-zА-Яа-яЁё]/.test(name) && name) {
            setError('Название типа должно состоять из букв!');
        }else
        {
            setError('')
            setSuccessMsg('')
            // отправляем данные на сервер или выполняем другие действия
            console.log('Имя типа:', name);
            await addType()
        }
    };
    return (
        <div>
            <div className={classes.modalName}>Добавление типа устройства</div>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="typeName"> Введите название типа</label>
                    <InputLine type="text" id="typeName" value={name} onChange={handleNameChange} required placeholder="Введите название типа..."/>
                    {error ? <p className={classes.modalError}>{error}</p> : <p className={classes.modalSuccess}>{successMsg ? successMsg : null}</p>}
                </div>
                <div className={classes.submitBtn}>
                    <Btn style={{backgroundColor: 'green'}} type="submit">Добавить</Btn>
                </div>
            </form>
        </div>
    );
};

export default CreateType;