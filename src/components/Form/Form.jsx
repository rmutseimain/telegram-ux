import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './Form.css';
import Input from "../Input/Input";

const Form = ( props ) => {
    const { questionList } = props;

    const {tg, queryId} = useTelegram();

    let [morningResults, setMorningResults] = useState([])
    let [isVisibleButton, setIsVisibleButton] = useState(false)

    const onChangeQuestion = (id, value, e) => {
        e.preventDefault()

        if (!morningResults.find( question => question.id === id)) {

            let updateQuestion = questionList.find( question => question.id === id)
            let finalStatus = [{...updateQuestion, result: value }]

            morningResults.length === 0 ? setMorningResults(finalStatus) : setMorningResults([...morningResults, ...finalStatus])

            // show main button when answered on all questions
            morningResults.length === questionList.length ? setIsVisibleButton(true) : setIsVisibleButton(false)
            return
        }

        let updatedQuestion = morningResults.filter( question => question.id === id)
        let notUpdatedQuestion = morningResults.filter( question => question.id !== id)
        updatedQuestion.map( item => item.result = value)
        setMorningResults([...notUpdatedQuestion, ...updatedQuestion])
    }

    // main button
    const onSendData = useCallback(async () => {
        const data = {
            survey: morningResults,
            queryId
        }

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
    }, [morningResults, queryId])

    const send = async (e) => {
        e.preventDefault()
        const data = {
            survey: morningResults,
            queryId,
        }

        console.log(`Sending message to bot-server ${data}`)

        try {
            await fetch('http://localhost:8081/morning', {
                method: 'POST',
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(isVisibleButton) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
    }, [isVisibleButton]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        morningResults.length === questionList.length ? setIsVisibleButton(true) : setIsVisibleButton(false)
    }, [morningResults])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    return (
        <form className={"form"}>
            {questionList.map( item => {
                return <Input question={item} onChangeQuestion={onChangeQuestion} key={item.id} />
            })
            }
            <button onClick={send}>Send</button>
        </form>

    );
};

export default Form;