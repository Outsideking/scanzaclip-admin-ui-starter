# Scanzaclip — Admin UI + API bundle

This bundle adds:
- Admin dashboard (Next.js pages): /admin
- Requests list/detail pages
- Users role manager
- API: list/get/stats requests, users list/set-role
- Email/Google login page

## Setup
1) Copy these files into your Next.js project (pages/ & lib/ & components/).
2) Ensure Firebase ENV variables are set (same as permissions-starter bundle).
3) Create Firestore indexes if prompted by the console for queries.
4) Open /login to sign in, then go to /admin.

## Collections expected
- users/{uid}.roles: array of strings
- permission_requests: created by your app or API
- permissions_assign, notifications, audit_logs (from previous bundle)
