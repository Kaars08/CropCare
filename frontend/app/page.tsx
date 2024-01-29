import { Component } from './Component';
import styles from "./page.module.css";

function Weather() {
  return (
    <>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </>
  )
}

function Forecast() {
  return (
    <>
      <h1>Weather Forecast:</h1>
      <div className={styles.subtext}><a href="/forecast">View More</a></div>
    </>
  )
}

function Disease() {
  return (
    <>
      <h1>Disease:</h1>
      <div className={styles.subtext}><a href="/forecast">View More</a></div>
    </>
  )
}

function Irrigation() {
  return (
    <>
      <h1>Irrigation Plans:</h1>
      <div className={styles.subtext}><a href="/irrigation">View More</a></div>
    </>
  )
}

function Recomendations() {
  return (
    <>
      <h1>Crop Recomendations:</h1>
      <div className={styles.subtext}><a href="/recomend">View More</a></div>
    </>
  )
}

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.fullWidth}>
        <Weather />
      </div>
      <div>
        <div><Forecast /></div>
      </div>
      <div>
        <div><Disease /></div>
      </div>
      <div>
        <div><Irrigation /></div>
      </div>
      <div>
        <div><Recomendations /></div>
      </div>
    </div >
  );
}
