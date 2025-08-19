// pages/admin/requests/index.jsx
import AdminLayout from '../../../components/AdminLayout';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function RequestsPage(){
  const { data } = useSWR('/api/admin/requests/list', fetcher, { refreshInterval: 5000 });

  return (
    <AdminLayout>
      <h1 style={{fontSize:24, fontWeight:700}}>Permission Requests</h1>
      <table style={{width:'100%', marginTop:16, borderCollapse:'collapse'}}>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Requester</Th>
            <Th>Resource</Th>
            <Th>Permissions</Th>
            <Th>Status</Th>
            <Th>Open</Th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((r)=> (
            <tr key={r.id} style={{borderTop:'1px solid #eee'}}>
              <Td>{r.id}</Td>
              <Td>{r.requesterName}</Td>
              <Td>{r.targetResource}</Td>
              <Td>{(r.requestedPermissions || []).join(', ')}</Td>
              <Td>{r.status}</Td>
              <Td><Link href={`/admin/requests/${r.id}`}>View</Link></Td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

function Th({children}){ return <th style={{textAlign:'left', padding:8, fontSize:12, color:'#666'}}>{children}</th>; }
function Td({children}){ return <td style={{padding:8}}>{children}</td>; }
