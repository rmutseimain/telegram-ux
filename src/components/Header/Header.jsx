import React from 'react';
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const dispatch = useDispatch()

    const setState = (name) => {
        dispatch({type: 'HOME', payload: name})
    }

    return (
        // <div className="btn-group">
        //     <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        //         Action
        //     </button>
        //     <ul className="dropdown-menu">
        //         <li><a className="dropdown-item" href="#">Action</a></li>
        //         <li><a className="dropdown-item" href="#">Another action</a></li>
        //         <li><a className="dropdown-item" href="#">Something else here</a></li>
        //         <li><hr className="dropdown-divider"/></li>
        //         <li><a className="dropdown-item" href="#">Separated link</a></li>
        //     </ul>
        // </div>

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
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon">asdddd</span>sss
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNavDropdown">
        //         <ul className="navbar-nav">
        //             <li className="nav-item active">
        //                 <a className="nav-link" onClick={() => setState('Home')} >Home <span className="sr-only">(current)</span></a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={() => setState('Morning')}>Morning survey</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={() => setState('Evening')}>Eventing survey</a>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
    )
};

export default Header;