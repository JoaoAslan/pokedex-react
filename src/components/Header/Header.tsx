import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles['header-div']}>
            <h1 className={styles['title']}>Pokédex</h1>
        </div>
    );
}

export default Header;