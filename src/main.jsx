import React from "react";
import { createRoot, ReactDOM  } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
