// NOTA
// No olvides agregar redux-thunk a la lista de dependencias
// npm install redux-thunk
// Tambien podemos agregar redux-devtools-extension si queremos utilizar las dev tools de forma combinada con Thunk


import {combineReducers} from "@reduxjs/toolkit";
import personajesReducer from "../reducers/personajesReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
// Importamos applyMiddleware de Redux, para poder agregar Thunk como Middleware
import { createStore, applyMiddleware } from 'redux';
import {TypedUseSelectorHook, useSelector as useReduxSelector} from "react-redux";
// Importamos el thunk de redux-thunk
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    personajes: personajesReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector

export const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)