import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import store from './store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>
);
