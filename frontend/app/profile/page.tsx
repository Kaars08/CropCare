'use client'

import { useState, useEffect } from 'react';
import style from './page.module.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <h1 className={style.title}>
        Profile:
      </h1>
      <div className={style.container}>
        <div className={style.leftItem}>Username</div><input type="textbox" value="Hello" disabled />
      </div>
      <div className={style.container}>
        <div className={style.leftItem}>Email</div><input type="textbox" value="Hello" disabled />
      </div>
      <div className={style.container}>
        <div className={style.leftItem}>Location</div><input type="textbox" value="Hello" disabled />
      </div>
      <div className={style.container}>
        <div className={style.leftItem}>Local Time</div><input type="textbox" value="Hello" disabled />
      </div>
      <div className={style.container}>
        <div className={style.leftItem}>Timezone</div><input type="textbox" value="Hello" disabled />
      </div>
      <div className={style.container}>
        <div className={style.leftItem}>Coordinates</div><input type="textbox" value="Hello" disabled />
      </div>
    </>
  )
}

export default Profile;
