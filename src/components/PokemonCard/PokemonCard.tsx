import { useState } from 'react';
import styles from './PokemonCard.module.css';

export const TYPE_COLORS: Record<string, string> = {
	fire: '#ffa860',
	grass: '#77c471',
	bug: '#aecc64',
	dark: '#7c798a',
	dragon: '#6392c2',
	ground: '#e3946d',
	electric: '#ebdb86',
	fairy: '#e3b1df',
	fighting: '#8c4150',
	flying: '#bccbe8',
	ghost: '#959dcf',
	ice: '#a4ded4',
	normal: '#bbbdbb',
	poison: '#b98fc4',
	psychic: '#e3a6a3',
	rock: '#dbd1ab',
	steel: '#90c5d1',
	water: '#37a7f2',
	default: '#595761',
};

export const TYPE_BADGE_COLORS: Record<string, string> = {
	bug: '#83ac24',
	dark: '#45434b',
	dragon: '#1260af',
	electric: '#dfc63b',
	fire: '#ff8039',
	fairy: '#cf65c6',
	fighting: '#b8314c',
	flying: '#6c8cc4',
	ghost: '#505daa',
	grass: '#53ad4c',
	ground: '#ce7244',
	ice: '#7de2d1',
	normal: '#8f918e',
	poison: '#ae59c5',
	psychic: '#f37974',
	rock: '#bdab6b',
	steel: '#5695A3',
	water: '#2e8cd5',
};

type PokemonCardProps = {
    id: number,
    name: string,
    sprite?: string,
    types: string[]
}

function PokemonCard({
    id, name, types, sprite
}: PokemonCardProps) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 }); // Reseta a inclinação quando o mouse sai
    };

    const idFormat = '#'+id.toString().padStart(2, '0');
    const nameFormat = formatString(name);

    const [ corPrimaria, corSecundaria ] = types.map((t) => TYPE_COLORS[t]);
    
    // Mesclamos as variáveis CSS de cor com a rotação dinâmica do 3D
    const cardStyle = {
        '--cor-primaria': corPrimaria,
        '--cor-secundaria': corSecundaria,
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${rotate.x || rotate.y ? 1.02 : 1})`,
    } as React.CSSProperties;

    const boxCardStyles = `${styles['pokemon-card-box']} ${(types.length > 1)? `${styles['background-gradient']}` : `${styles['background-monocrhome']}`}`

    return (
        <div 
            className={boxCardStyles} 
            style={cardStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles['pokemon-info']}>
                <label className={styles['pokemon-id']}>{idFormat}</label>
                <label className={styles['pokemon-name']}>{nameFormat}</label>
                <div className={styles['pokemon-types-box']}>
                    {types.map((t) => (
                        <span className={styles['pokemon-type']} style={{backgroundColor: TYPE_BADGE_COLORS[t]}} key={t}>
                            <img className={styles['pokemon-type-icon']} src={`/icons/${t}.svg`} alt={t}/>
                            <label className={styles['pokemon-type-name']}>{formatString(t)}</label>
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles['pokemon-sprite-box']}>
                <img className={styles['pokemon-sprite-img']} src={sprite} alt={name}></img>
            </div>
        </div>
    )
}

function formatString(text: string) {
    return text[0].toUpperCase() + text.slice(1);
}

export default PokemonCard;