// pages/api/admin/requests/stats.js
import { db } from '../../../../lib/firebaseAdmin.js';

export default async function handler(req, res){
  const statuses = ['pending','approved','denied'];
  const counts = {};
  for (const s of statuses){
    const snap = await db.collection('permission_requests').where('status','==',s).get();
    counts[s] = snap.size;
  }
  res.status(200).json(counts);
}
