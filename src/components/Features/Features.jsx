import React from "react";

function Features(props) {

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01" style={{
                width: '80%'
            }}>{props.question.id}. {props.question.name}</label>
            <select className="form-select" id="inputGroupSelect01" style={{
                width: '20%'
            }}>
                <option selected>Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    );
}

export default Features;