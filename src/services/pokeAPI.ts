import type { PokemonSummary, PokemonDetailed } from '../types/Pokemon.ts';
import {toPokemonSummary} from '../mappers/pokemonMapper.ts';

export async function getPokemonSummary(identifier: number|string): Promise<PokemonSummary> {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        if (!res.ok) {
            throw new Error(`${res.status}: Error on fetching data: ${identifier}`);
        }
        const result = await res.json();
        
        return toPokemonSummary(result);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getTypes(): Promise<Record<string, string>> {
   try {
        const res = await fetch("https://pokeapi.co/api/v2/type/");
        if (!res.ok) {
            throw new Error(`${res.status}: Error on fetching types`);
        }
        const result = await res.json();
        const types: Record<string, string> = Object.values(result.results).filter((t:any) => t.name != 'unknown' && t.name != 'stellar').reduce((acc: Record<string, string>, value: any) => {
            acc[value.name] = value.url;
            return acc;
        }, {});

        return types;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getGenerations(): Promise<Record<string, string>> {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/generation/");
        if (!res.ok) {
            throw new Error(`${res.status}: Error on fetching generations`);
        }
        const result = await res.json();
        const gen: Record<string, string> = Object.values(result.results).reduce((acc: Record<string, string>, value: any) => {
            acc[value.name] = value.url;
            return acc;
        }, {});

        return gen;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Aux. function to fetch multiples urls in same time
export async function fetchMultiplesUrls<T>(ulrs: string[]): Promise<T[]> {
    const promisses = ulrs.map(async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error ${res.status} to access ${url}`);
        }

        return res.json() as Promise<T>;
    });

    return Promise.all(promisses);
}