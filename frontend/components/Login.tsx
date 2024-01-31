import styles from './Login.module.css';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userId } from '@/atoms/userId';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [_, setId] = useAtom(userId);

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('userId', data.userid);
        setId(data.userId);
      })
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.title}>
          Sign In
        </div>
        <div className={styles.form}>
          <form onSubmit={formSubmit} >
            <div>
              <input type="email" placeholder="Email:" onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div>
              <input type="password" placeholder="Password:" onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <div><input type="submit" value="Log in" /></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
