import { useState, useEffect } from "react";
import {getPokemonByID} from '../services/pokeAPI.ts';
import type {PokemonSummary} from "../types/Pokemon";

export function useFetchPokemonByID(id: number) {
    const [pokemon, setPokemon] = useState<PokemonSummary|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const pokemonData = await getPokemonByID(id);
                if (!pokemonData) {
                    throw new Error(`Error on fetching data: ${id}`);
                }
                setPokemon(pokemonData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon()
    }, [id]);

    return {pokemon, loading, error};
}