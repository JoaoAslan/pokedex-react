export type PokemonDetailed = PokemonSummary & {
    generation: string;
    species: {
        is_baby: boolean,
        is_mythical: boolean,
        is_legendary: boolean,
        has_gender_differences: boolean,
        forms_switchable: boolean,
        evolution_chain: number
    },
    about: {
        generation: string;
        weight: number;
        height: number;
        abilities: string[];
        gender: number; //  being female (in eighths; or -1 for genderless)
        capture_rate: number;
        strengths: string[];
        weakness: string[];
    };
    base_stats: {
        hp: number,
        attack: number,
        defense: number,
        special_attack: number,
        special_defense: number,
        speed: number
    };
    evolutions: Evolution[] | null;
}

export type PokemonSummary = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: string[];
}

export type Evolution = {
    id: number,
    name: string,
    trigger: string
}