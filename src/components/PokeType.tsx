import { Box, CardMedia } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

interface TypeProps {
    idx : number
}

export const PokeType : React.FC<TypeProps> = (props : TypeProps) : React.ReactElement<TypeProps> => {
    
    const [pokeTyyppi, setPokeTyyppi] = useState<any>();
    const haeTyyppiData = async () : Promise<any> => {

        await fetch(`https://pokeapi.co/api/v2/pokemon/${(props.idx >= 905) ? props.idx + 9096 : props.idx + 1}/`)
        .then((response) => response.json())
        .then((data => setPokeTyyppi(data)))
    }
    
    useEffect(() => {
        haeTyyppiData()
    }, [])
    
  return (
<>
    <CardMedia component="img" src={pokeTyyppi?.sprites.other['official-artwork'].front_default} alt="ei kuvaa" sx={{width:"100%"}}/>
    <Box sx={{display:'flex', alignItems:"center"}}>
        {
        pokeTyyppi?.types?.map((tyyppi : any, idx : number) => {
            return (
            <>
            <CardMedia key={idx} component="img" style={{width:"50%"}} src={`/images/${tyyppi.type.name}.png`} alt="ei kuvaa"/>
            </>
            )
        })
        }
    </Box>
    </>
  )
}
