import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

import { SHOW_ALERT, HIDE_ALERT} from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    // Funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type:  SHOW_ALERT,
            payload: {
                msg, 
                categoria
            }
        });

        // Después de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }


    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        > 
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;