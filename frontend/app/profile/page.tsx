'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';

interface UserDataType {
  username: string,
  email: string,
  latitude: number,
  longitude: number,
}

interface LocationDataType {
  location: {
    country: string,
    name: string,
    region: string,
    localtime: string,
    tz_id: string,
  }
}

function Profile() {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [locationData, setLocationData] = useState<LocationDataType | null>(null);
  const [id, _] = useAtom(userId);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/user?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
      })
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:5000/api/forecast/?user_id=${id}`)
      .then(res => res.json())
      .then(data => {
        setLocationData(data);
      })
  }, [id])

  return (
    <>
      <div className={styles.comb}>
        <h1 className={styles.title}>
          Profile:
        </h1>
        <img src='/person-circle.svg' width={70} className={styles.image} />
      </div>

      {userData && locationData &&
        <>
          <div className={styles.container}>
            <div className={styles.leftItem}>Username</div><input type="textbox" value={userData.username} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Email</div><input type="textbox" value={userData.email} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Country</div><input type="textbox" value={locationData.location.country} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Location</div><input type="textbox" value={`${locationData.location.name}, ${locationData.location.region}`} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Local Time</div><input type="textbox" value={locationData.location.localtime} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Timezone</div><input type="textbox" value={locationData.location.tz_id} disabled />
          </div>
          <div className={styles.container}>
            <div className={styles.leftItem}>Coordinates</div><input type="textbox" value={`${userData.latitude}, ${userData.longitude}`} disabled />
          </div>
        </>
      }
    </>
  )
}

export default Profile;
