import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { PokemonContext } from '../context/PokemonContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export const Navigaatiopalkki : React.FC = () : React.ReactElement => {

  const { apiData, setSearchResults, searchResults } = React.useContext(PokemonContext)
  const searchRef : any = useRef<any>()
  const navigate = useNavigate();

  const haku = () => {
    let tulos = apiData.pokeData?.results?.filter((pokemon : any) => {
      let hakuehto = new RegExp(`${searchRef!.current!.value}`, "i")
      return (hakuehto.test(pokemon.name))})

      navigate('/searchresults', { state : tulos })
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit">
        <Toolbar>
          <Box 
          component={"img"}
          src={`/images/logo.png`}
          sx={{width:"10%", padding:"10px", margin:"auto"}}
          />
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputRef={searchRef}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
              <IconButton onClick={() => haku()}>
                <SearchIcon />
              </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
