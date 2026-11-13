import styles from './Header.module.css';


function Header() {
    return (
        <div className={styles.headerDiv}>
            <h1 className={styles.title}>Pokédex</h1>
            <div className={styles.filterDiv}>
                <input type="search" placeholder="Qual pokemon você está pensando?"></input>
                <select>
                    
                </select>
                <select>
                    
                </select>
            </div>
        </div>
    )
}

export default Header;