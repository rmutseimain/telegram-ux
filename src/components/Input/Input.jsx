import React from 'react';
import "./Input.css";

const Input = (props) => {
    return (
        <div>
            <b>{props.question.id}. {props.question.name}</b>
            <input
                className={'input'}
                type="text"
                placeholder={props.question.changeState.state}
                value={props.question.changeState.state}
                onChange={props.question.changeState.changeState}
            />
        </div>
    );
};

export default Input;