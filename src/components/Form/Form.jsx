import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import Input from "../Input/Input";

const Form = () => {
    const {tg, queryId, user} = useTelegram();
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
    let [isVisibleButton, setIsVisibleButton] = useState(false)

    const onChangeQuestion = (id, value, e) => {
        e.preventDefault()

        if (!morningResults.find( question => question.id === id)) {
            let updateQuestion = morning.find( question => question.id === id)
            morningResults.push({...updateQuestion, result: value})

            // show main button when answered on all questions
            morningResults.length === morning.length ? setIsVisibleButton(true) : setIsVisibleButton(false)
            return
        }

        morningResults.filter( question => question.id === id).map( item => item.result = value)

    }

    useEffect(() => {
        if(isVisibleButton) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [isVisibleButton]);

    // main button
    const onSendData = useCallback(async () => {
        const data = {
            survey: morningResults,
            queryId: queryId ? queryId : '123',
        }

        console.log(`Sending message to bot-server ${data}`)

        try {
            await fetch('https://telegram-server-p1ci.onrender.com/morning', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log(e)
        }
    }, [morningResults])

    const send = async (e) => {
        e.preventDefault()
        const data = {
            survey: morningResults,
            queryId,
        }

        console.log(`Sending message to bot-server ${data}`)

        try {
            await fetch('https://telegram-server-p1ci.onrender.com/morning', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log(e)
        }
    }

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
            <p>{queryId ? queryId : 'none'} </p>
            <p>{user ? user : 'none'} </p>
            {morning.map( item => {
                return <Input question={item} onChangeQuestion={onChangeQuestion} key={item.id} />
            })
            }
            <button onClick={send}>Send</button>
        </form>

    );
};

export default Form;