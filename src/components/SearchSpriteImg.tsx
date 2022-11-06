import React, { useEffect, useState } from 'react'
import { Location } from 'react-router'

interface Props {
    location : Location
    idx : number
}

export const SearchSpriteImg : React.FC<Props> = (props : Props) : React.ReactElement<Props> => {

    const [pokeData, setPokeData] = useState<any>();

    const haeData = async () : Promise<any> => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${props.location.state[props.idx].url.substr(34)}`)
        .then((response) => response.json())
        .then((data => setPokeData(data)))
    }
    
    useEffect(() => {
        haeData()
    }, [pokeData])

  return (
    <img src={pokeData?.sprites?.front_default} alt="PICTURE NOT FOUND"/>
  )
}
