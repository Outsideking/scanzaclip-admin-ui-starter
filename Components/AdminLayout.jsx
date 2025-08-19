// components/AdminLayout.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseClient';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminLayout({ children }){
  const [user, setUser] = useState(null);
  useEffect(()=>{
    return onAuthStateChanged(auth, setUser);
  },[]);

  return (
    <div style={{display:'grid', gridTemplateColumns:'240px 1fr', minHeight:'100vh'}}>
      <aside style={{padding:'16px', borderRight:'1px solid #eee'}}>
        <div style={{fontWeight:700, marginBottom:16}}>Scanzaclip Admin</div>
        <nav className="space-y-2" style={{display:'flex', flexDirection:'column', gap:8}}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/requests">Permission Requests</Link>
          <Link href="/admin/users">Users</Link>
        </nav>
        <div style={{marginTop:'auto'}}>
          {user ? (
            <button onClick={()=>signOut(auth)} className="mt-6 px-3 py-2 border rounded">Sign out</button>
          ) : null}
        </div>
      </aside>
      <main style={{padding:'24px'}}>{children}</main>
    </div>
  );
}
