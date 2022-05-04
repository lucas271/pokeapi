import './styles.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Pokemons from './pages/Pokemons';
import Pokemon from './pages/Pokemon';

function RoutesComponent() {  
  return <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Pokemons/>}/>
        <Route path='/:id' element={<Pokemon/>}></Route>
      </Routes>
    </Router>
  </>
}

export default RoutesComponent;
