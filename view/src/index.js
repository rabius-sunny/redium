import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './redux'
import { Provider } from 'react-redux'
import './main.scss'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
