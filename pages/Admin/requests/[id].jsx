// pages/admin/requests/[id].jsx
import AdminLayout from '../../../components/AdminLayout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url) => fetch(url).then(r=>r.json());

export default function RequestDetail(){
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(()=> id ? `/api/admin/requests/get?id=${id}` : null, fetcher);
  const [note, setNote] = useState('');

  const act = async(action)=>{
    await fetch('/api/admin/approve-permission', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({ reqId: id, approverUid: 'admin-ui', action, note })
    });
    mutate();
  }

  if (!data) return <AdminLayout>Loading...</AdminLayout>;

  const r = data.request;
  return (
    <AdminLayout>
      <h1 style={{fontSize:24, fontWeight:700}}>Request #{id}</h1>
      <div style={{marginTop:12}}>
        <div><b>Requester:</b> {r.requesterName}</div>
        <div><b>Resource:</b> {r.targetResource}</div>
        <div><b>Permissions:</b> {(r.requestedPermissions||[]).join(', ')}</div>
        <div><b>Status:</b> {r.status}</div>
      </div>
      <div style={{marginTop:16}}>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Note..." style={{width:'100%', height:80, border:'1px solid #eee', borderRadius:8, padding:8}}/>
        <div className="flex" style={{display:'flex', gap:8, marginTop:8}}>
          <button onClick={()=>act('approve')} className="px-3 py-2 bg-green-600 text-white rounded">Approve</button>
          <button onClick={()=>act('deny')} className="px-3 py-2 bg-red-600 text-white rounded">Deny</button>
          <button onClick={()=>act('needs_info')} className="px-3 py-2 bg-gray-200 rounded">Ask info</button>
        </div>
      </div>
    </AdminLayout>
  );
}
