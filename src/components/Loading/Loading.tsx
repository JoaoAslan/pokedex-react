import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles['loading-container']} role="status" aria-label="Carregando">
      <div className={styles['loading']} />
    </div>
  );
}

export default Loading;