// pages/login.jsx
import { auth, provider } from '../lib/firebaseClient';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/admin';
  };
  const loginGoogle = async () => {
    await signInWithPopup(auth, provider);
    window.location.href = '/admin';
  };

  return (
    <div style={{display:'grid', placeItems:'center', minHeight:'100vh'}}>
      <div style={{border:'1px solid #eee', borderRadius:8, padding:24, width:360}}>
        <h1 style={{fontSize:20, fontWeight:700}}>Sign in</h1>
        <div className="space-y-2" style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border rounded px-3 py-2"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border rounded px-3 py-2"/>
          <button onClick={loginEmail} className="px-3 py-2 border rounded">Sign in with Email</button>
          <button onClick={loginGoogle} className="px-3 py-2 border rounded">Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}
