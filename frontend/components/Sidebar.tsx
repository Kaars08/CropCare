'use client'

import styles from './Sidebar.module.css'
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';

function Sidebar() {
  const [_, setId] = useAtom(userId);

  function logout() {
    localStorage.removeItem('userId');
    setId(null);
  }

  return (
    <>
      <a href="/" className={styles.heading}><div>CashCrop</div></a>
      <div className={styles.sidebarItemTitle}>MAIN MENU</div>
      <a href="/" className={styles.buttonHandler}><button className={styles.button}>Dashboard</button></a>
      <a href="/detect" className={styles.buttonHandler}><button className={styles.button}>Disease Detection</button></a>
      <a href="/recomend" className={styles.buttonHandler}><button className={styles.button}>Crop Recomendation</button></a>
      <a href="/irrigation" className={styles.buttonHandler}><button className={styles.button}>Irrigation Plan</button></a>
      <div className={styles.sidebarItemTitle}>ACCOUNT</div>
      <a href="/profile" className={styles.buttonHandler}><button className={styles.button}>My Profile</button></a>
      <a href="/about" className={styles.buttonHandler}><button className={styles.button}>About</button></a>
      <div className={styles.buttonHandler}><button className={styles.button} onClick={logout}>Logout</button></div>
      <div className={styles.sidebarFooter}>Made by Cyclopse</div>
    </>
  );
}

export default Sidebar;


