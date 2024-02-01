'use client';

import styles from './page.module.css';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';
import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [id, _] = useAtom(userId)

  useEffect(() => {
    fetch(`http://localhost:5000/api/forecast?userid=${id}`)
      .then(res => res.json())
      .then(res => {
        setResponse(res)
        setLoading(false)
        console.log(res)
      })
  }, [id])

  return (
    <h2>
      {!loading && response && (<>At {response.location.name}, {response.location.region}</>)}
    </h2>
  )
}

export default App;
