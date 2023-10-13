import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
if (!root) {
    throw new Error('root element does not exist')
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

