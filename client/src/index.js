import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(process.env.REACT_APP_API_URL)
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
        <App />
    </Context.Provider>

);
