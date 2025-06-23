import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Modal from 'react-modal';
import './index.css'; // Your main CSS file, where Tailwind is imported

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);