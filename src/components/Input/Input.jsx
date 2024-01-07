import React, {useState} from 'react';
import "./Input.css";

const Input = (props) => {
    const [ state, setState ] = useState('');

    return (
        <div>
            <b>{props.question.id}. {props.question.name}</b>
            <input
                className={'input'}
                type="text"
                placeholder={props.question.name}
                value={state}
                onChange={(e) => {
                    setState(e.target.value)
                    props.onChangeQuestion(props.question.id, e.target.value, e)
                }}
            />
        </div>
    );
};

export default Input;