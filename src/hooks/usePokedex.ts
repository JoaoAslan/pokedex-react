import { useState, useEffect } from "react";
import { initCache } from '../cache/pokemonChace.ts';
import type {PokemonSummary} from "../types/Pokemon.ts";

export function usePokedex() {
    const [pokemons, setPokemons] = useState<PokemonSummary[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController();
        const fetchPokemon = async () => {
            try {
                // Original State
                setLoading(true);
                setError(null);

                // const pokemonData = await getPokemonSummary();
                // if (!pokemonData) {
                //     throw new Error(`Error on fetching data: ${id}`);
                // }
                // setPokemon(pokemonData);
                
                initCache();
            } catch (err) {
                if (err instanceof Error && err.name != 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }
        fetchPokemon();
        return () => controller.abort();
    }, []);

    return {pokemons, loading, error};
}