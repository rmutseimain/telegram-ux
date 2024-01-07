import React, {useCallback, useEffect, useRef, useState} from 'react';
const ramda = require('ramda');
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import Input from "../Input/Input";

const Form = () => {
    const {tg} = useTelegram();

    const morning = [
        {
            id: 1,
            name: 'Количество часов сна:'
        },
        {
            id: 2,
            name: 'Качество сна:'
        },
        {
            id: 3,
            name: 'Уровень энергии:'
        }
    ]

    const  setUseState = (questions) => {
        questions.map( question => {
            question.ref = useRef()
        })
    }

    const getRefResults = (questions) => {
        let results = []
        let payload = [];

        questions.map( question => {
            results.push(question.ref?.current?.value)
            question.result = question.ref?.current?.value
            payload.push(ramda.pick(['id', 'result', 'name'], question))
        })

        return {results, payload}
    }

    setUseState(morning);

    const onSendData = useCallback(() => {

        const data = getRefResults(morning).payload
        console.log(data)
        tg.sendData(JSON.stringify(data));
    }, getRefResults(morning).results)

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        let results = getRefResults(morning).results;
        let visible = true;

        results.map( item => {
            if (ramda.isEmpty(item)){
                visible = false
            }
        })

        if(visible) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, getRefResults(morning).results)

    const survey = (e) => {
        e.preventDefault()
        let results = getRefResults(morning).payload
        console.log(results)
    }

    return (
        <form className={"form"}>
            {morning.map( item => {
                return <Input question={item} key={item.id} />
            })}
            <button onClick={survey} >Send</button>
        </form>

    );
};

export default Form;