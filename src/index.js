import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './statemanager/StateProvider';
import reducer, { initialState } from './statemanager/reduce';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
     <App />
    </StateProvider>
  </React.StrictMode>
);



