import type {PokemonSummary} from '../types/Pokemon.ts';
import {toPokemonSummary} from '../mappers/pokemonMapper.ts';

export async function getPokemonByID(id: number): Promise<PokemonSummary> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
            throw new Error(`${res.status}: Error on fetching data: ${id}`);
        }
        const result = await res.json();
        
        return toPokemonSummary(result);
    } catch (err) {
        console.error(err);
        throw err;
    }
}