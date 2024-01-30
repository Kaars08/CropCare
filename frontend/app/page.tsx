'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { userId } from '@/atoms/userId';
import { useAtom } from 'jotai';

import Login from '@/components/Login';
import Sidebar from '@/components/Sidebar';
import SidebarMinimal from '@/components/SidebarMinimal';

function App() {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useAtom(userId);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setId(userId);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.rootLayout}>
        <div className={styles.sidebar}>
          <SidebarMinimal />
        </div>
        <div className={styles.content}></div>
      </div>
    )
  }

  if (id) {
    return (
      <div className={styles.rootLayout}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          You have logged in
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rootLayout}>
      <div className={styles.sidebar}>
        <SidebarMinimal />
      </div>
      <div className={styles.content}>
        <Login />
      </div>
    </div>
  )
};

export default App;
