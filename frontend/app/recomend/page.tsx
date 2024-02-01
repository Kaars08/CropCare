'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId'
import styles from './page.module.css';

interface Response {
  prediction: string,
  nitrogen: number;
  phosophorous: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

function Recomend() {
  const [data, setData] = useState<Response | null>(null);
  const [id, _] = useAtom(userId);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recomend/?userid=${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  }, [id])

  return (
    <>
      <h1 className={styles.title}>
        Crop Recomendation:
      </h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nitrogen Content</th>
            <th>Phosphorous Content</th>
            <th>Potassium Content</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>ph</th>
            <th>Rainfall</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {data === null ? <>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </> : <>
              <td>{data.nitrogen}</td>
              <td>{data.phosophorous}</td>
              <td>{data.potassium}</td>
              <td>{data.temperature && data.humidity.toFixed(2)}</td>
              <td>{data.humidity && data.humidity.toFixed(2)}</td>
              <td>{data.ph && data.ph.toFixed(2)}</td>
              <td>{data.rainfall && data.rainfall.toFixed(2)}</td>
            </>}
          </tr>
        </tbody>
      </table>

      {data && <div className={styles.text}>From this data, we predict that the most optimal crop
        for your next harvest is <u>{data && data.prediction && data.prediction.charAt(0).toUpperCase() + data.prediction.slice(1)}</u></div>}
    </>
  )
}

export default Recomend;
