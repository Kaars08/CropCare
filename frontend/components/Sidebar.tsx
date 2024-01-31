'use client'

import styles from './Sidebar.module.css'
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';
import { useEffect, useState } from 'react';

function Sidebar() {
  const [_, setId] = useAtom(userId);
  const [currentPath, setCurrentPath] = useState('');

  function logout() {
    localStorage.removeItem('userId');
    setId(null);
  }

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  console.log(currentPath)

  return (
    <>
      <a href="/" className={styles.heading}><div>CashCrop</div></a>
      <div className={styles.sidebarItemTitle}>DASHBOARD</div>
      <a href="/" className={styles.buttonHandler}>
        <button className={`${styles.button} ${currentPath === '/' && styles.buttonSelected}`}>Overview</button>
      </a>
      <a href="/forecast" className={styles.buttonHandler}><button className={styles.button}>Weather Forecast</button></a>
      <a href="/detect" className={styles.buttonHandler}><button className={styles.button}>Disease Detection</button></a>
      <a href="/recomend" className={styles.buttonHandler}><button className={styles.button}>Crop Recomendation</button></a>
      <a href="/irrigation" className={styles.buttonHandler}><button className={styles.button}>Irrigation Plan</button></a>
      <div className={styles.sidebarItemTitle}>ACCOUNT</div>
      <a href="/profile" className={styles.buttonHandler}><button className={styles.button}>My Profile</button></a>
      <a href="/settings" className={styles.buttonHandler}><button className={styles.button}>Settings</button></a>
      <a href="/support" className={styles.buttonHandler}><button className={styles.button}>Support</button></a>
      <div className={styles.buttonHandler}><button className={styles.button} onClick={logout}>Logout</button></div>
      <div className={styles.sidebarFooter}>Made by Cyclopse</div>
    </>
  );
}

export default Sidebar;
