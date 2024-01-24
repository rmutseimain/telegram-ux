import React from 'react';
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const dispatch = useDispatch()

    const setState = (name) => {
        dispatch({type: 'HOME', payload: name})
    }

    return (
        <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                Dropdown link
            </a>

            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={() => setState('Home')}>Home</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setState('Morning')}>Morning survey</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => setState('Evening')}>Eventing survey</a></li>
            </ul>
        </div>
    )
};

export default Header;