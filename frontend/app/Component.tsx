import styles from "./Component.module.css";

function Component({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <div>{children}</div>
    </div>
  );
}

export default Component;
