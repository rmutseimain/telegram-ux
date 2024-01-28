import React, {useCallback, useEffect, useRef, useState} from 'react';
import Features from "../Features/Features";
import UploadImage from "../UploadImage/UploadImage";
import {useTelegram} from "../../hooks/useTelegram";
import './Form.css';
import {TYPE_OF_QUESTION} from "../../constans";
import Input from "../Input/Input";

const Form = ( props ) => {
    const { questionList } = props;

    const {tg, queryId} = useTelegram();

    let [morningResults, setMorningResults] = useState([])
    const getFile = useRef();
    let [isVisibleButton, setIsVisibleButton] = useState(false)

    const onChangeQuestion = (id, value, e) => {
        e.preventDefault()

        if (!morningResults.find(question => question.id === id)) {

            let updateQuestion = questionList.find( question => question.id === id)

            if (updateQuestion.type === 'file') {
                if (getFile?.current?.files)  value = getFile.current.files[0]
            }

            let finalStatus = [{...updateQuestion, result: value }]
            morningResults.length === 0 ? setMorningResults(finalStatus) : setMorningResults([...morningResults, ...finalStatus])
            return
        }

        let updatedQuestion = morningResults.filter( question => question.id === id)
        let notUpdatedQuestion = morningResults.filter( question => question.id !== id)

        if (updatedQuestion.type === 'file') {
        }

        updatedQuestion.map( item => item.result = value)
        setMorningResults([...notUpdatedQuestion, ...updatedQuestion])
    }

    // main button
    const onSendData = useCallback(async () => {

        let file = morningResults.filter(item => item.type === 'file')[0]
        let questions = morningResults.filter(item => item.type !== 'file')

        const formData = new FormData();
        formData.append("files", file?.result);
        formData.append("survey", JSON.stringify(questions));
        formData.append("queryId", queryId);

        try {
            await fetch('https://telegram-server-p1ci.onrender.com/morning', {
                method: 'POST',
                body: formData
            })
        } catch (e) {
            console.log(e)
        }
    }, [morningResults, queryId])

    const send = async (e) => {
        e.preventDefault()

        let file = morningResults.filter(item => item.type === 'file')[0]
        let questions = morningResults.filter(item => item.type !== 'file')

        const formData = new FormData();
        formData.append("files", file?.result);
        formData.append("survey", JSON.stringify(questions));
        formData.append("queryId", 'queryId');
        // formData.append("survey", questions);

        // const data = {
        //     survey: morningResults,
        //     queryId,
        // }

        console.log(`Sending message to bot-server ${formData}`)

        try {
            await fetch('http://localhost:8080/morning', {
                method: 'POST',
                body: formData
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
        let results = morningResults.filter(item => item.type !== 'file');
        let list = questionList.filter(item => item.type !== 'file');

        results.length === list.length ? setIsVisibleButton(true) : setIsVisibleButton(false)
    }, [morningResults])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    return (
        <form className={"form"}>
            {questionList.map( item => {
                if (item.type === TYPE_OF_QUESTION.QUESTION_LIST) {
                    return <Features question={item} onChangeQuestion={onChangeQuestion} key={item.key}/>
                }

                if (item.type === TYPE_OF_QUESTION.QUESTION_INPUT) {
                    return <Input question={item} onChangeQuestion={onChangeQuestion} key={item.key}/>
                }

                if (item.type === TYPE_OF_QUESTION.FILE) {
                    return <UploadImage ref={getFile} question={item} onChangeQuestion={onChangeQuestion} key={item.key}/>
                }
            })}
            <button onClick={send}>Send</button>
        </form>

    );
};

export default Form;