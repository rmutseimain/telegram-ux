import React, {useState} from "react";

function Features(props) {
    const [ state, setState ] = useState('');
    const listOfOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01"
                   style={{
                       width: '80%'
                    }}
            >
                {props.question.id}. {props.question.name}
            </label>
            <select className="form-select" id="inputGroupSelect01"
                    style={{
                        width: '20%'
                    }}
                    value={state}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setState(e.target.value)
                        props.onChangeQuestion(props.question.id, e.target.value, e)
                    }}
            >
                {listOfOptions.map( item => {
                    if (item === 0 ) return <option value={item} key={item} defaultValue={item}>{item}</option>
                    return <option value={item} key={item}  >{item}</option>
                })}
            </select>
        </div>
    );
}

export default Features;