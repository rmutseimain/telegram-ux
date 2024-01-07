import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
            const [ state, setState ] = useState('');
            question.changeState = {
                state: state,
                changeState: (e) => setState(e.target.value)
            }
        })
    }

    setUseState(morning);

    const onSendData = useCallback(() => {

        let payload = {text: 'hello'};
        // let payload = [];
        // morning.map( question => {
        //     payload.push(ramda.pick(['id', 'result', 'name'], question))
        // })

        tg.sendData(JSON.stringify(payload));
    }, [])

    // checking if visible
    let isVisibleButton = useMemo(() => {
        let visible = true;

        morning.map( item => {
            if (ramda.isEmpty(item.changeState.state)){
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

    const survey = (e) => {
        e.preventDefault()
        // let results = getRefResults(morning).payload
        // console.log(results)
    }

    return (
        <form className={"form"}>
            {morning.map( item => {
                return <Input question={item} key={item.id} />
            })}
        </form>

    );
};

export default Form;