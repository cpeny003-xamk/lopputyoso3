import { Box, CardMedia, Dialog, DialogContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

interface DialogProps {
    setOpenDialog : Dispatch<SetStateAction<boolean>>
    openDialog : boolean
    index : number | undefined
}


export const PokeDialog : React.FC<DialogProps> = (props : DialogProps) : React.ReactElement<DialogProps> => {

    const [pokeTyyppi, setPokeTyyppi] = useState<any>();
    
    const haeTyyppiData = async () : Promise<any> => {

        await fetch(`https://pokeapi.co/api/v2/pokemon/${(props.index! >= 905) ? props.index! + 9096 : props.index! + 1}/`)
        .then((response) => response.json())
        .then((data => setPokeTyyppi(data)))
    }
    
    useEffect(() => {
        haeTyyppiData()
    }, [props.index])
    
  return (
    <Dialog
    open={props.openDialog}
    onClose={() => props.setOpenDialog(false)}
    >
        <DialogContent>
            <Typography sx={{textTransform:"capitalize", margin:"auto", width:"50%"}} variant="h2">{pokeTyyppi?.name}</Typography>
            <CardMedia component="img" src={pokeTyyppi?.sprites.other['official-artwork'].front_default} alt="ei kuvaa" sx={{width:"50%", margin:"auto"}}/>
                <Box sx={{textAlign:"center"}}>
                {
                pokeTyyppi?.types?.map((tyyppi : any, idx : number) => {
                    return (
                    <CardMedia key={idx} component="img" style={{width:"25%", margin:"auto", display:"inline"}} src={`https://cpeny003-xamk.github.io/lopputyoso3/images/${tyyppi.type.name}.png`} alt="ei kuvaa"/>
                    )
                })
                }
                <br/>
                <Typography><Link to={`/${(props.index! >= 905) ? props.index! + 9096 : props.index! + 1}`} style={{fontWeight:"bold"}}>Full details</Link></Typography>
                </Box>  
                <List sx={{border:"1px solid black", borderRadius:"10px", backgroundColor:"lightgoldenrodyellow", boxShadow: 5, marginTop:"5px"}}>
                {
                pokeTyyppi?.stats?.map((stat : any, idx : number) => {
                    return(
                    <ListItem key={idx}>
                        <ListItemText sx={ 
                            (stat.stat.name === "hp") ? {textTransform:"uppercase", backgroundColor:"red", padding:"10px", borderRadius:"20px", boxShadow: 5} 
                            : (stat.stat.name === "attack") ? {textTransform:"uppercase", backgroundColor:"orange", padding:"10px", borderRadius:"20px", boxShadow: 5}
                            : (stat.stat.name === "defense") ? {textTransform:"uppercase", backgroundColor:"yellow", padding:"10px", borderRadius:"20px", boxShadow: 5}
                            : (stat.stat.name === "special-attack") ? {textTransform:"uppercase", backgroundColor:"lightblue", padding:"10px", borderRadius:"20px", boxShadow: 5}
                            : (stat.stat.name === "special-defense") ? {textTransform:"uppercase", backgroundColor:"green", padding:"10px", borderRadius:"20px", boxShadow: 5}
                            : (stat.stat.name === "speed") ? {textTransform:"uppercase", backgroundColor:"pink", padding:"10px", borderRadius:"20px", boxShadow: 5} : {}
                            }>
                            <b>{(stat.stat.name).replace("-", " ")}: {stat.base_stat}</b>
                        </ListItemText>
                    </ListItem>
                    )
                })
                }
                <ListItem>
                    <ListItemText
                    sx={{textAlign:"center"}}
                    ><b>TOTAL: {pokeTyyppi?.stats?.reduce((edellinen : any, nykyinen : any) => Number(edellinen) + Number(nykyinen.base_stat), 0)}</b></ListItemText>
                </ListItem>
                </List>
                {/* <button onClick={() => console.log(pokeTyyppi?.sprites.other['official-artwork'].front_default)}>TESTI</button> */}
        </DialogContent>
    </Dialog>
  )
}
