import {Action, ActionCreator, ThunkAction} from "@reduxjs/toolkit";
import { buscarPersonajesAPI } from "../services/personaje.services";
import {IRootState} from "../store/store";
import Personaje from "../types/personaje.types";

export interface BuscarPersonajesAction extends Action{
    type: "BUSCAR_PERSONAJES",
    name: string
}

export interface BuscarPersonajesSuccessAction extends Action{
    type: "BUSCAR_PERSONAJES_SUCCESS",
    personajes: Personaje[]
}

export interface BuscarPersonajesErrorAction extends Action{
    type: "BUSCAR_PERSONAJES_ERROR",
    error: string;
}

export interface BuscarPersonajesThunkAction extends ThunkAction<void, IRootState, unknown, BuscarPersonajesAction | BuscarPersonajesSuccessAction | BuscarPersonajesErrorAction>{}

const buscarPersonajes:ActionCreator<BuscarPersonajesAction> = (busqueda: string) => {
    return {
        type: "BUSCAR_PERSONAJES",
        name: busqueda
    }
}

const buscarPersonajesSuccess:ActionCreator<BuscarPersonajesSuccessAction> = (personajes: Personaje[]) => {
    return {
        type: "BUSCAR_PERSONAJES_SUCCESS",
        personajes: personajes
    }
}

const buscarPersonajesError:ActionCreator<BuscarPersonajesErrorAction> = (error: string) => {
    return {
        type: "BUSCAR_PERSONAJES_ERROR",
        error: error
    }
}

const MINIMUM_CHARS_TO_SEARCH = 3; 

// buscarPersonajes es ahora el "thunk action creator"
export const buscarPersonajesThunk = (name: string): BuscarPersonajesThunkAction => {
    return async (dispatch, getState) => {
        if (name.length >= MINIMUM_CHARS_TO_SEARCH){
            dispatch(buscarPersonajes(name))
            try{
                const response = await buscarPersonajesAPI(name);
                dispatch(buscarPersonajesSuccess(response))
            }catch(e){
                dispatch(buscarPersonajesError(e))
            }
        }
    }
}


export type PersonajesAction =
    | BuscarPersonajesAction
    | BuscarPersonajesSuccessAction
    | BuscarPersonajesErrorAction;