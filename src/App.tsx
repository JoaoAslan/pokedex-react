import { useEffect, useState } from 'react';
import './styles/global.css'

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
  
  return (
    <>
      {pokemons && pokemons.map((p) => (
        <h1>{p.id} - {p.name}</h1>
      ))}
    </>
  )
}

export default App
