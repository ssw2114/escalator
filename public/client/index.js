import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
ReactDOM.render(React.createElement(Provider, { store: store },
    React.createElement(Router, { history: history },
        React.createElement(App, null))), document.getElementById('app'));
//# sourceMappingURL=index.js.map