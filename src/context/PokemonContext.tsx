import React, { createContext, useEffect, useRef, useState } from "react";

export const PokemonContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode
}

export interface Pokemons{
    count : number
    next : null
    previous : null
    results : any[]
    }

export const PokemonProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const haeDataTehty : React.MutableRefObject<boolean> = useRef(false);

    const [searchResults, setSearchResults] = useState<any>([]);

    const [apiData, setApiData] = useState<any>({
      pokeData : {},
      dataHaettu : false,
      virhe : "",
      paivitetty : new Date()
    })

    const haeData = async () : Promise<void> => {

        try {
            
            await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            .then((response) => response.json())
            .then((data => setApiData({
                ...apiData,
                pokeData : data,
                dataHaettu : true,
              })))
            
        } catch (e) {


            
        }
    }

    useEffect(() => {
        if (!haeDataTehty.current)
        haeData();

        return () => {
          haeDataTehty.current = true
        }
    }, [])
    
    
    return (
        <PokemonContext.Provider value={{ apiData, haeData, searchResults, setSearchResults }}>
            {props.children}
        </PokemonContext.Provider>
    )
    
}