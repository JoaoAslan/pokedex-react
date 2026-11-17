import styles from './PokemonList.module.css';

type PokemonListProps = {
    children: React.ReactNode;
}

function PokemonList({
    children
}: PokemonListProps) {
    return (
        <div className={styles['pokemon-list']}>
            {children}
        </div>
    );
}

export default PokemonList;