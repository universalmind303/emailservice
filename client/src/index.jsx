import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

// imports bootstrap and main css sheet for all components

import './styles/bootstrap.scss';

render(<App />, document.getElementById('app'));
