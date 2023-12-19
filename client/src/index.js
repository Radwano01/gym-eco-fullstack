import React from 'react';
import App from "./App"
import ReactDOM from 'react-dom/client';
import './index.css';
import "./i18n"
import {BrowserRouter as Router} from "react-router-dom"
import store from './app/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(  
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    
);
