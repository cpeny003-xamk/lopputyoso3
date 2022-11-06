import { Container, Typography, CardMedia, Box, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const PokeFull : React.FC = () : React.ReactElement => {

    const [pokeFull, setPokeFull] = useState<any>();
    const {id} = useParams()
    const navigate = useNavigate()
    
    const haeData = async () : Promise<any> => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((data => setPokeFull(data)))
    }
    
    useEffect(() => {
        haeData()
    }, [])
    
  return (
    <Container sx={{marginTop:"100px", with:"960px"}}>
    <Button onClick={() => navigate("/")}>Return to front page</Button>
    <Typography sx={{textTransform:"capitalize", textAlign:"center"}} variant="h2">{pokeFull?.name}</Typography>
    <CardMedia component="img" src={pokeFull?.sprites.other['official-artwork'].front_default} alt="ei kuvaa" sx={{width:"50%", margin:"auto"}}/>
        <Box sx={{textAlign:"center"}}>
        {
        pokeFull?.types?.map((Full : any, idx : number) => {
            return (
            <CardMedia key={idx} component="img" style={{width:"25%", margin:"auto", display:"inline"}} src={`/images/${Full.type.name}.png`} alt="ei kuvaa"/>
            )
        })
        }
        <br/>
        </Box>
        <Typography variant="h4" sx={{textAlign:"center"}}>Abilities</Typography>
        <List sx={{border:"1px solid black", borderRadius:"10px", backgroundColor:"lightgoldenrodyellow", boxShadow: 5, marginTop:"5px"}}>
        {
        pokeFull?.abilities?.map((ability : any, idx : number) => {
            return(
            <ListItem key={idx}>
                <ListItemText sx={{textTransform:"capitalize"}}>
                    <b>{(ability.is_hidden) ? (ability.ability.name).replace("-", " ") + " (Hidden ability)":(ability.ability.name).replace("-", " ")}</b>
                </ListItemText>
            </ListItem>
            )
        })
        }
        </List>
        <Typography variant="h4" sx={{textAlign:"center"}}>Stats</Typography>
        <List sx={{border:"1px solid black", borderRadius:"10px", backgroundColor:"lightgoldenrodyellow", boxShadow: 5, marginTop:"5px"}}>
        {
        pokeFull?.stats?.map((stat : any, idx : number) => {
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
                <Typography variant="h6" sx={{textAlign:"center"}}>TOTAL: {pokeFull?.stats?.reduce((edellinen : any, nykyinen : any) => Number(edellinen) + Number(nykyinen.base_stat), 0)}</Typography>
        </List>
        <Typography variant="h4" sx={{textAlign:"center"}}>Moves</Typography>
        <TableContainer>
      <Table sx={{ border:"1px solid black", borderRadius:"10px", backgroundColor:"lightgoldenrodyellow", boxShadow: 5, marginTop:"5px"}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Move Name</TableCell>
            <TableCell align="right">Level Requirement</TableCell>
            <TableCell align="right">Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {pokeFull?.moves?.map((row : any) => {
                return (
                    <TableRow key={row.move.name}>
                        <TableCell sx={{textTransform:"capitalize"}}>{(row.move.name).replace("-", " ")}</TableCell>
                        <TableCell align="right" sx={{textTransform:"capitalize"}}>{(row.version_group_details[0].level_learned_at)}</TableCell>
                        <TableCell align="right" sx={{textTransform:"capitalize"}}>{(row.version_group_details[0].move_learn_method.name)}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
        {/* <button onClick={() => console.log(pokeFull?.sprites.other['official-artwork'].front_default)}>TESTI</button> */}
    </Container>
  )
}
