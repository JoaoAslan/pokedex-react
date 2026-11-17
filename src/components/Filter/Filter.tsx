import styles from './Filter.module.css';

type FilterProps = {
    setSearchTerm: (value: string) => void,
    searchTerm: string
}

function Filter({
    searchTerm,
    setSearchTerm
}: FilterProps) {

    return (
        <div className={styles['filter-container']}>
            <span className={`material-symbols-outlined ${styles['search-icon']}`}>
                search
            </span>
            <input
                className={styles['input-text']}
                type="text" 
                placeholder="Qual Pokémon está buscando?" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
        </div>
    );
}

export default Filter;