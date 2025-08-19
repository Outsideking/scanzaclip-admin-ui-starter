// pages/api/admin/requests/list.js
import { db } from '../../../../lib/firebaseAdmin.js';

export default async function handler(req, res){
  const snap = await db.collection('permission_requests').orderBy('createdAt', 'desc').limit(200).get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.status(200).json({ items });
}
