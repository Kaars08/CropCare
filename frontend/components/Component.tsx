import styles from './Component.module.css'

function Component({ children }: { children: React.ReactNode }) {
  return <div className={styles.outer}><div className={styles.wrapper}><div>{children}</div></div></div>
}

export default Component;
