import { List, ListItem, ListItemText, Container, Typography, Link, Button } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchSpriteImg } from './SearchSpriteImg'

export const SearchResults : React.FC = () : React.ReactElement => {

    const location = useLocation();
    const navigate = useNavigate();
    
  return (
    <Container sx={{marginTop:"100px", with:"960px"}}>
    <Button onClick={() => navigate("/")}>Return to front page</Button>
    <List sx={{border:"1px solid black", borderRadius:"10px", backgroundColor:"lightgoldenrodyellow", boxShadow: 5, marginTop:"5px"}}>
    <Typography variant="h5" sx={{padding:"5px"}}>Search results ({location.state.length})</Typography>
    { location.state.map((result : any, idx : number) => {
        return (
        <ListItem key={idx}>
            <ListItemText>
            <SearchSpriteImg idx={idx} location={location}/>
            <Link href={`http://localhost:3000/${result.url.substr(34)}`} variant="h6" sx={{fontWeight:"bold", textTransform:"capitalize"}}>{result.name}</Link>
            </ListItemText>
        </ListItem>
            )
        })
    }
    </List>
    </Container>
  )
}
