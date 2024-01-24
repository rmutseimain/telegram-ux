import React from 'react';
import {useDispatch} from "react-redux";

const Header = () => {
    const dispatch = useDispatch()

    const setState = (name) => {
        dispatch({type: 'HOME', payload: name})
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" onClick={() => setState('Home')} >Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setState('Morning')}>Morning survey</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setState('Evening')}>Eventing survey</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Header;