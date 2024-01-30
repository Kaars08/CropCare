import styles from './index.module.css';

function Login() {
  return <div className={styles.component}>
    <div className={styles.componentContent}>
      <input type="textbox" placeholder='Your email' />
      <input type="textbox" placeholder='Your password' />
      <input type="submit" value='LOGIN' />
    </div>
  </div>;
}

export default Login;
