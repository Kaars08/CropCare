'use client';

import styles from './page.module.css';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';
import { useEffect, useState } from 'react';

interface UserInfo {
  username: string,
  email: string,
  latitude: number,
  longitude: number,
}

interface ForecastResponse {
  location: {
    name: string,
    localtime: string,
    region: string
  }
  current: {
    wind_kph: number,
    temp_c: number,
    humidity: number,
    condition: {
      text: string,
    }
  }
  forecast: {
    forecastday: ForecastInfo[]
  }
}

interface ForecastInfo {
  date: string,
  day: {
    avgtemp_c: number,
    avghumidity: number,
    maxwind_kph: number,
    condition: {
      text: string
    }
  }
}

function App() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [id, _] = useAtom(userId);

  useEffect(() => {
    setLoadingUser(true);
    fetch(`http://localhost:5000/api/auth/user?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
        setLoadingUser(false);
      });
  }, [id]);

  useEffect(() => {
    setLoadingForecast(true);
    fetch(`http://localhost:5000/api/forecast?user_id=${id}`)
      .then(res => res.json())
      .then(res => {
        setForecast(res);
        setLoadingForecast(false);
      });
  }, [id]);

  if (loadingUser || loadingForecast) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className={styles.title}>
        Hello, {userInfo && userInfo.username && userInfo.username.charAt(0).toUpperCase() + userInfo.username.slice(1)}
      </h1>

      <div className={styles.subtext}>{forecast && forecast.location && `${forecast.location.name}, ${forecast.location.region}`}</div>

      <div className={styles.container}>
        <div className={styles.element}>
          <div className={styles.date}>Current Weather</div>
          <div className={styles.temperature}>{forecast && forecast.current && forecast.current.temp_c}° C</div>
          <div className={styles.condition}>{forecast && forecast.current && forecast.current.condition && forecast.current.condition.text}</div>
        </div>
        <div className={styles.element}>
          <div className={styles.date}>Today</div>
          <div className={styles.temperature}>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].day && forecast.forecast.forecastday[0].day.avgtemp_c}° C</div>
          <div className={styles.condition}>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].day.condition && forecast.forecast.forecastday[0].day.condition.text}</div>
        </div>
        <div className={styles.element}>
          <div className={styles.date}>1 day</div>
          <div className={styles.temperature}>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].day && forecast.forecast.forecastday[1].day.avgtemp_c}° C</div>
          <div className={styles.condition}>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].day.condition && forecast.forecast.forecastday[1].day.condition.text}</div>
        </div>
        <div className={styles.element}>
          <div className={styles.date}>2 days</div>
          <div className={styles.temperature}>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].day && forecast.forecast.forecastday[2].day.avgtemp_c}° C</div>
          <div className={styles.condition}>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].day.condition && forecast.forecast.forecastday[2].day.condition.text}</div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Wind (kph)</th>
            <th>Humidity (%)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Now</td>
            <td>Current</td>
            <td>{forecast && forecast.current && forecast.current.wind_kph}</td>
            <td>{forecast && forecast.current && forecast.current.humidity}</td>
            <td>{forecast && forecast.current && forecast.current.condition && forecast.current.condition.text}</td>
          </tr>
          <tr>
            <td>Today</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].date}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].day.maxwind_kph}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].day.avghumidity}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[0] && forecast.forecast.forecastday[0].day.condition.text}</td>
          </tr>
          <tr>
            <td>1 day</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].date}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].day.maxwind_kph}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].day.avghumidity}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[1] && forecast.forecast.forecastday[1].day.condition.text}</td>
          </tr>
          <tr>
            <td>2 days</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].date}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].day.maxwind_kph}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].day.avghumidity}</td>
            <td>{forecast && forecast.forecast && forecast.forecast.forecastday[2] && forecast.forecast.forecastday[2].day.condition.text}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
