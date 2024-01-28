import React, {useState} from 'react';
import "./Input.css";

const Input = (props) => {
    const [ state, setState ] = useState('');
    let { question, onChangeQuestion } = props

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default" style={{
                width: '80%'
            }}>
                {question.id}. {question.name}
            </span>

            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                   style={{
                       width: '20%'
                   }}
                   placeholder={'0'}
                   value={state}
                   onChange={(e) => {
                       setState(e.target.value)
                       onChangeQuestion(question.id, e.target.value, e)
                   }}
            />
        </div>
        // <div>
        //     <b>{props.question.id}. {props.question.name}</b>
        //     <input
        //         className={'input'}
        //         type="text"
        //         placeholder={props.question.name}
        //         value={state}
        //         onChange={(e) => {
        //             setState(e.target.value)
        //             props.onChangeQuestion(props.question.id, e.target.value, e)
        //         }}
        //     />
        // </div>
    );
};

export default Input;