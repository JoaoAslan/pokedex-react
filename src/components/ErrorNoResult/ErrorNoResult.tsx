import styles from './ErrorNoResult.module.css';

function ErrorNoResult() {
    return (
        <div className={styles['error-container']}>
            <span className={`material-symbols-outlined ${styles['icon-sad']}`}>
                sentiment_dissatisfied
            </span>
            <label className={styles['error-text']}>Nenhum resultado encontrado...</label>
        </div>
    );
}

export default ErrorNoResult;