# What to enable in Firebase (owner: quizapp-student)

For **Model A** (you host it, users just log in with Google and their data
saves permanently to your Firestore). Do these 4 things once.

## 1. Enable Google login  ✅ (required for login)
Firebase Console → project **quizapp-student**
→ **Build → Authentication → Get started**
→ **Sign-in method → Google → Enable** → pick a support email → **Save**

## 2. Create the database  ✅ (required for permanent save)
→ **Build → Firestore Database → Create database**
→ **Production mode** → choose a location (e.g. `eur3` / `nam5`) → **Enable**

## 3. Set access rules  ✅ (who can read/write)
Firestore → **Rules** tab → paste this → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolios/{id} {
      allow read: if true;                                   // anyone can VIEW a published portfolio (/p/<id>)
      allow create: if request.auth != null;                // must be logged in to publish
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.ownerId;        // only the owner can change their own
    }
  }
}
```

What this "allows":
- **read: true** → published portfolios are publicly viewable by link (that's the point).
- **create: signed-in** → only logged-in users can save.
- **update/delete: owner only** → nobody can edit someone else's portfolio.

## 4. Authorized domains  ✅ (where login is allowed)
→ **Authentication → Settings → Authorized domains**
- `localhost` is already there (for local testing).
- When you deploy, **Add domain** → your live domain, e.g. `your-site.netlify.app`
  or `your-site.vercel.app`.

---

## To go live (deployment) — save config as env vars
`.env` is gitignored, so on your host add these 6 variables:

```
VITE_FIREBASE_API_KEY=AIzaSyCXq1f8MHqO64jz2QeSumanhXoahiadOfE
VITE_FIREBASE_AUTH_DOMAIN=quizapp-student.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=quizapp-student
VITE_FIREBASE_STORAGE_BUCKET=quizapp-student.firebasestorage.app
VITE_FIREBASE_SENDER_ID=241247810187
VITE_FIREBASE_APP_ID=1:241247810187:web:5662066dee735b6a8b1a8e
```

- **Netlify:** Site settings → Environment variables → add each
- **Vercel:** Project → Settings → Environment Variables → add each

That's it. After steps 1–4, Google login + permanent save work for everyone.
```
```
