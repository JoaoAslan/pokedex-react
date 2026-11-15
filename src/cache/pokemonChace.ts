import type { PokemonSummary, PokemonDetailed } from '../types/Pokemon.ts';
import { getTypes, getGenerations, fetchMultiplesUrls } from '../services/pokeAPI.ts';

export const SUMMARY_CACHE = new Map<number|string,PokemonSummary>();
export const DETAILED_CACHE = new Map<number|string, PokemonDetailed>();
export const POKEMON_PER_TYPES = new Map<string, Set<string>>();
export const POKEMON_PER_GEN = new Map<string, Set<string>>();

export const TYPES = new Set<string>();
export const GEN = new Set<string>();

export async function initCache() {

    const [typesData, generationsData] = await Promise.all([
        getTypes(),
        getGenerations()
    ]);

    Object.keys(typesData).forEach((type) => TYPES.add(type));
    Object.keys(generationsData).forEach((gen) => GEN.add(gen));

    const [pokemonPerTypesData, pokemonPerGenData] = await Promise.all([
        fetchMultiplesUrls(Object.values(typesData)),
        fetchMultiplesUrls(Object.values(generationsData))
    ]);

    pokemonPerTypesData.forEach((value: any) => {
        const pokemonNames = new Set<string>(
            value.pokemon.map((item: any) => item.pokemon.name)
        );
        POKEMON_PER_TYPES.set(value.name, pokemonNames);
    });

    pokemonPerGenData.forEach((value: any) => {
        const pokemonNames = new Set<string>(
            value.pokemon_species.map((item: any) => item.name)
        );
        POKEMON_PER_GEN.set(value.name, pokemonNames);
    });
}