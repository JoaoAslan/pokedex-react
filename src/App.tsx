import { useEffect, useState } from 'react';
import './styles/global.css';
import Header from './components/Header/Header';
import PokemonList from './components/PokemonList/PokemonList';
import PokemonCard from './components/PokemonCard/PokemonCard';
import Loading from './components/Loading/Loading';
import ErrorNoResult from './components/ErrorNoResult/ErrorNoResult';
import LoadMorePokemons from './components/LoadMorePokemons/LoadMorePokemons';

async function getPokemon(identifier: number | string): Promise<any> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  if (!res.ok) {
    throw new Error(`${res.status}: Error on fetching data: ${identifier}`);
  }
  return res.json();
}

function App() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastIndex, setLastIndex] = useState<number>(10);

  async function loadPokemons(ids: number[], first = false) {
    try {
      setLoading(true);
      const promisses = ids.map((id) => getPokemon(id));
      const resolvedData = await Promise.all(promisses);

      setPokemons((prev) => {
        if (first) return resolvedData;
        const onlyNewPokemons = resolvedData.filter((newer) => !prev.some((loaded) => loaded.id === newer.id));
        return [...prev, ...onlyNewPokemons];
      });

      setLastIndex(ids[ids.length-1]+1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      loadPokemons([1, 2, 3, 4, 5, 6, 7, 8, 9], true);
  }, []);

  const handleLoadMore = () => {
    const newIds = Array.from({length: 9}, (_, i) => i + lastIndex);
    loadPokemons(newIds);
  };

  const normalizedSearch = searchTerm.toLowerCase().trim();
  const pokemonsVisible = pokemons.filter((p) => {
    return (
      p.name.includes(normalizedSearch) ||
      p.id.toString().includes(normalizedSearch)
    );
  });

  const showLoading = (loading && pokemons.length === 0);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {showLoading && <Loading />}

      {!showLoading && pokemonsVisible.length === 0 && <ErrorNoResult />}

      {!showLoading && pokemonsVisible.length > 0 && (
        <>
          <PokemonList>
            {pokemonsVisible.map((p) => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                types={p.types.map((t: any) => t.type.name)}
                sprite={p.sprites.other['official-artwork'].front_default}
              />
            ))}
          </PokemonList>

          {normalizedSearch === '' && (
            <LoadMorePokemons loadPokemons={handleLoadMore} loading={loading} />
          )}
        </>
      )}
    </>
  );
}

export default App;