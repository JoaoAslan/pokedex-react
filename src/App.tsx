import './styles/global.css'
import {useFetchPokemonByID} from './hooks/useFetchPokemon.js';

function App() {
  const result = useFetchPokemonByID(1);
  console.log(result.loading)

  return (
    <>
      <h1>Hello World!</h1>
    </>
  )
}

export default App
