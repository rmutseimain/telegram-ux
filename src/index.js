import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from "./components/Home/Home";
import {createStore} from "redux";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

const menuItems = { name: 'Home', page: <Home />}

const reducer = (state = menuItems, action) => {
    if (action) return {...state, page: action.payload }
    return state
}

const store = createStore(reducer)

root.render(
    <Provider store={store} >
        <App />
    </Provider>
);