import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigaatiopalkki } from './components/Navigaatiopalkki';
import { PokeData } from './components/PokeData';
import { PokeFull } from './components/PokeFull';
import { SearchResults } from './components/SearchResults';
import { PokemonProvider } from './context/PokemonContext';

const App : React.FC = () : React.ReactElement => {
  return (
    <PokemonProvider>
    <Navigaatiopalkki/>
    <Routes>
      <Route path="/" element={<PokeData/>}/>
      <Route path="/:id" element={<PokeFull/>}/>
      <Route path="/searchresults" element={<SearchResults/>}/>
    </Routes>
    </PokemonProvider>
  );
}

export default App;
