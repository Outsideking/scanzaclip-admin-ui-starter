// pages/api/admin/users/set-role.js
import { db } from '../../../../lib/firebaseAdmin.js';

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { uid, role } = req.body || {};
  if (!uid || !role) return res.status(400).json({ error: 'uid/role required' });

  const userRef = db.collection('users').doc(uid);
  const snap = await userRef.get();
  const roles = new Set((snap.exists ? (snap.data().roles || []) : []));
  roles.add(role);
  await userRef.set({ roles: Array.from(roles) }, { merge: true });

  res.status(200).json({ ok: true });
}
