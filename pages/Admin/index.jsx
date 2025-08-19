// pages/admin/index.jsx
import AdminLayout from '../../components/AdminLayout';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r=>r.json());

export default function AdminHome(){
  const { data } = useSWR('/api/admin/requests/stats', fetcher);
  return (
    <AdminLayout>
      <h1 style={{fontSize:24, fontWeight:700}}>Dashboard</h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:16}}>
        <Card title="Pending">{data?.pending ?? '-'}</Card>
        <Card title="Approved">{data?.approved ?? '-'}</Card>
        <Card title="Denied">{data?.denied ?? '-'}</Card>
      </div>
    </AdminLayout>
  );
}

function Card({title, children}){
  return <div style={{border:'1px solid #eee', borderRadius:8, padding:16}}>
    <div style={{color:'#666', fontSize:12}}>{title}</div>
    <div style={{fontSize:28, fontWeight:700}}>{children}</div>
  </div>;
}
