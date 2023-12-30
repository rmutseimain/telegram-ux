import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../hooks/useTelegram";
// const [countOfSleep, setCoundOfSleep ] = useState('');
// const [qualityOfSleep, setQualityOfSleep ] = useState('');
// const [energyLevel, setEnergyLevel ] = useState('');
const Form = () => {

    const [country, setCountry ] = useState('');
    const [street, setStreet ] = useState('');
    const [subject, setSubject ] = useState('');
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }

        tg.sendData(JSON.stringify(data))
    }, [tg])

    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked', onSendData)

        return () => {
            tg.WebApp.offEvent('mainButtonClicked', onSendData)
        }
    }, [tg]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данние'
        })
    }, [tg]);


    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [tg, country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3> Введите данные </h3>
            <input
                className={'input'}
                type="text"
                placeholder={"Страна"}
                value={country}
                onChange={onChangeCountry}
            />

            <input
                className={'input'}
                type="text"
                placeholder={"Улица"}
                value={street}
                onChange={onChangeStreet}
            />
            {/*<input className={'input'} type="text" placeholder={"Количестно часов сна"}/>*/}
            {/*<input className={'input'} type="text" placeholder={"Качество сна"}/>*/}
            {/*<input className={'input'} type="text" placeholder={"Уровень енергии"}/>*/}

            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;