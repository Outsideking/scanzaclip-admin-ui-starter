// pages/api/admin/users/list.js
import { db } from '../../../../lib/firebaseAdmin.js';

export default async function handler(req, res){
  const snap = await db.collection('users').limit(500).get();
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.status(200).json({ items });
}
