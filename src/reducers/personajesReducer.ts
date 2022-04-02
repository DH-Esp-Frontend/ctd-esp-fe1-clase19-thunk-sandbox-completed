import {Reducer} from "@reduxjs/toolkit";
import {PersonajesAction} from "../actions/personajesActions";
import Personaje from "../types/personaje.types";

export interface PersonajesState{
    busqueda: string;
    status: "LOADING" | "COMPLETED"
    personajes: Personaje[],
    error: string | null
}

const initialState: PersonajesState = {
    busqueda: '',
    status: "COMPLETED",
    personajes: [],
    error: null
};

const personajesReducer:Reducer<PersonajesState, PersonajesAction> =
    (state = initialState, action): PersonajesState => {
    switch(action.type){
        case "BUSCAR_PERSONAJES":
            return {
                ...state,
                status: "LOADING",
                busqueda: action.name,
                error: null
            }
        case "BUSCAR_PERSONAJES_ERROR":
            return {
                ...state,
                status: "COMPLETED",
                error: action.error
            }
        case "BUSCAR_PERSONAJES_SUCCESS":
            return {
                ...state,
                status: "COMPLETED",
                personajes: action.personajes
            }
        default:
            return state;
    }
}
export default personajesReducer;