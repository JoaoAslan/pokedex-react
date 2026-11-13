import {type PokemonSummary} from '../types/Pokemon.ts';

export function toPokemonSummary(pokeData: any): PokemonSummary {
    const typesNames = pokeData.types.map((t: any) => t.type.name);

    return {
        id: pokeData.id,
        name: pokeData.name,
        sprites: { front_default: pokeData.sprites.other["official-artwork"].front_default },
        types: typesNames
    }
}