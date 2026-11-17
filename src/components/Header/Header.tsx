import styles from './Header.module.css';
import Filter from '../Filter/Filter';

type FilterProps = {
    setSearchTerm: (value: string) => void,
    searchTerm: string
}

function Header({
    searchTerm, setSearchTerm
}: FilterProps) {
    return (
        <div className={styles['header-div']}>
            <h1 className={styles['title']}>Pokédex</h1>
            <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
    );
}

export default Header;