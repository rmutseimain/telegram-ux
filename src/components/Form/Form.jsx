import React, {useCallback, useEffect, useMemo, useState} from 'react';
const ramda = require('ramda');
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import Input from "../Input/Input";

const Form = () => {
    const {tg, queryId} = useTelegram();

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
    let morningResults = []

    const onChangeQuestion = (id, value, e) => {
        e.preventDefault()

        if (!morningResults.find( question => question.id === id)) {
            let updateQuestion = morning.find( question => question.id === id)
            morningResults.push({...updateQuestion, result: value})
            return
        }

        morningResults.filter( question => question.id === id).map( item => item.result = value)
    }


    // checking if visible
    let isVisibleButton = useMemo(() => {
        let visible = true;

        morning.map( question => {
            if (ramda.isEmpty(question.result)){
                visible = false
            }


        })

        return visible
    }, [morning]);

    useEffect(() => {
        if(isVisibleButton) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [isVisibleButton]);

    // main button
    const onSendData = useCallback(() => {
        const data = {
            survey: morningResults,
            queryId,
        }

        console.log(`Sending message to bot-server ${data}`)

        fetch('https://gym-bot-ytkj.onrender.com/morning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [morningResults])


    useEffect(() => {

    }, []);

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

    return (
        <form className={"form"}>
            {morning.map( item => {
                return <Input question={item} onChangeQuestion={onChangeQuestion} key={item.id} />
            })}
        </form>

    );
};

export default Form;