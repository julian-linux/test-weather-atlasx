import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Pages from 'pages';

import store from 'config/store';

ReactDOM.render(
    <Provider store={store}>
        <Pages />
    </Provider>,
    document.getElementById('app'),
);
