import { useEffect, useState } from 'react';
import './styles/global.css';
import Header from './components/Header/Header';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonCard from './components/PokemonCard/PokemonCard';

export async function getPokemon(identifier: number|string): Promise<any> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        if (!res.ok) {
            throw new Error(`${res.status}: Error on fetching data: ${identifier}`);
        }
        const result = await res.json();
        
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

function App() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  
  useEffect(() => {
    const carregarPokemons = async () => {
      const listagemPokemons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const promessas = listagemPokemons.map((id) => getPokemon(id));
      const dadosResolvidos = await Promise.all(promessas);
      setPokemons(dadosResolvidos);
    }
    carregarPokemons();
  }, []);
  
  console.log(pokemons);

  return (
    <>
      <Header/>
      <PokemonList>
        {pokemons && pokemons.map((p) =>
          (
          <PokemonCard id={p.id} name={p.name} types={p.types.map((t:any)=> t.type.name)} sprite={p.sprites.other['official-artwork'].front_default}/>
        ))
        }
      </PokemonList>
    </>
  )
}

export default App
