import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import backgroundImage from './services/backgroundImage.jpg'

const root = ReactDOM.createRoot(document.getElementById('root'));
const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`
};
root.render(
  <React.StrictMode classname={styles.App} style={backgroundStyle}>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
