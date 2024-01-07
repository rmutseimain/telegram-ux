import React from 'react';
import "./Input.css";

const Input = (props) => {
    return (
        <div>
            <h4>{props.question.id}. {props.question.name}</h4>
            <input
                className={'input'}
                type="text"
                placeholder={props.question.name}
                ref={props.question.ref}
            />
        </div>
    );
};

export default Input;