// pages/api/admin/requests/get.js
import { db } from '../../../../lib/firebaseAdmin.js';

export default async function handler(req, res){
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'id required' });
  const ref = db.collection('permission_requests').doc(id);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ error: 'not found' });
  res.status(200).json({ request: { id: snap.id, ...snap.data() } });
}
