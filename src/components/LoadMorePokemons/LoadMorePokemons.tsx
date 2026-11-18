import styles from './LoadMorePokemons.module.css';

type LoadMorePokemonsProps = {
  loadPokemons: () => void;
  loading?: boolean;
};

function LoadMorePokemons({ loadPokemons, loading = false }: LoadMorePokemonsProps) {
  return (
    <div className={styles['load-more-container']}>
      <button
        className={styles['load-more-btn']}
        onClick={loadPokemons}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Carregar mais'}
      </button>
    </div>
  );
}

export default LoadMorePokemons;