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
    </>
  );
}

export default Sidebar;
