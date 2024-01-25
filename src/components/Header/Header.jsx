import React from 'react';
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

    const dispatch = useDispatch()

    const setState = (name) => {
        dispatch({type: 'HOME', payload: name})
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Menu</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#" onClick={() => setState('Home')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={() => setState('Features')}>Features</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Surveys
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={() => setState('Morning')}>Morning</a></li>
                                <li><a className="dropdown-item" href="#" onClick={() => setState('Evening')}>Evening</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        // <div className="dropdown">
        //     <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
        //         Dropdown link
        //     </a>
        //
        //     <ul className="dropdown-menu">
        //         <li><a className="dropdown-item" href="#" onClick={() => setState('Home')}>Home</a></li>
        //             <li><a className="dropdown-item" href="#" onClick={() => setState('Morning')}>Morning survey</a></li>
        //         <li><a className="dropdown-item" href="#" onClick={() => setState('Evening')}>Eventing survey</a></li>
        //     </ul>
        // </div>
    )
};

export default Header;