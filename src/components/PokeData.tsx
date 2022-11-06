import { Card, CardContent, CardHeader, Container, Grid,} from '@mui/material'
import React, { useContext, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { PokeDialog } from './PokeDialog'
import { PokeType } from './PokeType'

export const PokeData = () => {

    const { apiData, haeData } = useContext(PokemonContext)
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [index, setIndex] = useState<number>();
  

    const clickHandler = (idx : number) : any => {
      setIndex(idx);
      (openDialog) ? setOpenDialog(false) : setOpenDialog(true);
      console.log(index)
    }

  return (
    <Container style={{width:"960px", marginTop:"100px"}}>
      <Grid container spacing={1}>
        {
          apiData.pokeData?.results?.map((pokemon : any, idx : number) => {
            return (
              <>
              <Grid item xs={2} key={idx}>
                <Card onClick={() => clickHandler(idx)}>
                  <CardHeader
                  titleTypographyProps={{variant:'h6' }}
                  title={pokemon.name}
                  subheader={`#${idx + 1}`}
                  sx={{textTransform:"capitalize", fontSize:"1px"}}
                  />
                <CardContent>
                  <PokeType idx={idx}/>
                  {/* <Typography><a href={pokemon.url}>{pokemon.url}</a></Typography> */}
                </CardContent>
              </Card>
              </Grid>
              </>
            )
          })
        }
        <PokeDialog setOpenDialog={setOpenDialog} openDialog={openDialog} index={index}/>
      {/* <button onClick={() => {}}>Test</button> */}
      </Grid>
    </Container>
  )
}
