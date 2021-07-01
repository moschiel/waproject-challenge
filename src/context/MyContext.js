import {createContext, useState} from 'react';
import MainView from '../views/MainView/MainView';

export const MyContext = createContext({});

export const MyProvider = (props) => {
    const [view, setView] = useState(<MainView/>);
    const [apiResult, setApiResult] = useState([]);

    return (
        <MyContext.Provider 
            value={{
                view, setView, 
                apiResult, setApiResult
            }}
        >
            {props.children}
        </MyContext.Provider>
    );
}