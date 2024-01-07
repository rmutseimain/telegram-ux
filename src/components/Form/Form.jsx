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
    const morningResults = []

    const  setUseState = (questions) => {
        questions.map( question => {
            const [ state, setState ] = useState('');
            question.changeState = {
                state: state,
                changeState: (e) => setState(e.target.value)
            }
        })
    }

    setUseState(morning);

    const onSendData = useCallback(() => {
        const data = {
            survey: morning,
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
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    // checking if visible
    let isVisibleButton = useMemo(() => {
        let visible = true;

        morning.map( question => {
            if (ramda.isEmpty(question.changeState.state)){
                visible = false
            }

            if (!ramda.isEmpty(question.changeState.state)) {


                // adding item if not exist
                if (morningResults.filter(item => item?.id === question.id).length === 0) {
                    console.log(`Adding answer - ${question.name} - ${question.changeState.state}`)
                    morningResults.push({
                        id: question.id,
                        name: question.name,
                        state: question.changeState.state,
                    })
                    return
                }


                // updating items
                morningResults.map(item => {
                    if (item.id === question.id) {
                        if (!item.state) {
                            item.state = question.changeState.state
                        }

                        if (item.state && item.state !== question.changeState.state) {
                            item.state = question.changeState.state
                        }
                    }
                })
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

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    return (
        <form className={"form"}>
            {morning.map( item => {
                return <Input question={item} key={item.id} />
            })}
        </form>

    );
};

export default Form;