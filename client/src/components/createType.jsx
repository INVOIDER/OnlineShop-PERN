import React, {useEffect, useState} from 'react';
import InputLine from "./UI/input/InputLine";
import Btn from "./UI/button/Btn";
import classes from "../styles/modal.module.css";

const CreateType = ({Active}) => {
    const [name,setName] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('')


    useEffect(()=>{
        if(!Active){
            setName('')
            setSuccessMsg('')
            setError('')
        }
    },[Active])
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
        if (!/[A-Za-zА-Яа-яЁё]/.test(name) && name) {
            setError('Название типа должно состоять из букв!');
        }else
        {
            // отправляем данные на сервер или выполняем другие действия
            console.log('Имя типа:', name);
            setSuccessMsg('Тип был успешно добавлен!')
            setError('')
            setName('')
            // setActive(false)
        }
    };
    return (
        <div>
            <div className={classes.modalName}>Добавление типа устройства</div>
            <form className={classes.modalForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="typeName"> Введите название типа</label>
                    <InputLine type="name" id="typeName" value={name} onChange={handleNameChange} required placeholder="Введите название типа..."/>
                    {error ? <p className={classes.modalError}>{error}</p> : <p className={classes.modalSuccess}>{successMsg ? successMsg : null}</p>}
                </div>
                <div className={classes.submitBtn}>
                    <Btn style={{backgroundColor: 'green'}} type="submit" onClick={() => console.log('click')}>Добавить</Btn>
                </div>
            </form>
        </div>
    );
};

export default CreateType;