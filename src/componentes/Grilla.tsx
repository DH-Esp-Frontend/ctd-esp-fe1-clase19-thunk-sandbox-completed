import React, {FC, useEffect, useState} from "react";
import Personaje from "../types/personaje.types";
import {TypedUseSelectorHook, useSelector as useReduxSelector} from "react-redux";
import {IRootState} from "../store/store";

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector

const Grilla:FC = () => {

    const personajes = useSelector(state => state.personajes.personajes)
    if (!personajes || personajes.length === 0) return <></>

    return <div className="App-table" style={{marginTop: 50}}>
        {personajes.map((personaje) => {
            return ( <div style={{display: "flex", flexDirection: "column", alignItems:"center", marginBottom: "20px"}}>
                <label style={{marginBottom: 5}}>Nombre: {personaje.name}</label>
                <img src={personaje.image} alt={personaje.name}/>
            </div>)
        })}
    </div>
}

export default Grilla;