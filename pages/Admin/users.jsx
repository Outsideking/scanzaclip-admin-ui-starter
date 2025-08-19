// pages/admin/users.jsx
import AdminLayout from '../../components/AdminLayout';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url)=> fetch(url).then(r=>r.json());

export default function UsersPage(){
  const { data, mutate } = useSWR('/api/admin/users/list', fetcher);
  const [form, setForm] = useState({ uid:'', role:'viewer' });

  const addRole = async ()=>{
    await fetch('/api/admin/users/set-role', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({ uid:'', role:'viewer' });
    mutate();
  };

  return (
    <AdminLayout>
      <h1 style={{fontSize:24, fontWeight:700}}>Users</h1>
      <div style={{display:'flex', gap:8, marginTop:12}}>
        <input placeholder="User UID" value={form.uid} onChange={e=>setForm({...form, uid:e.target.value})} className="border rounded px-2 py-1" />
        <input placeholder="Role (e.g., admin, owner, genai)" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="border rounded px-2 py-1" />
        <button onClick={addRole} className="px-3 py-1 border rounded">Add/Set Role</button>
      </div>

      <table style={{width:'100%', marginTop:16, borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <Th>UID</Th>
            <Th>Roles</Th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map(u => (
            <tr key={u.id} style={{borderTop:'1px solid #eee'}}>
              <Td>{u.id}</Td>
              <Td>{(u.roles || []).join(', ')}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

function Th({children}){ return <th style={{textAlign:'left', padding:8, fontSize:12, color:'#666'}}>{children}</th>; }
function Td({children}){ return <td style={{padding:8}}>{children}</td>; }
