# Firebase Setup — Google Login + Cloud Save

The Portfolio Builder works without Firebase (URL share + localStorage).
To enable **Google login** and **cloud-saved public portfolios** (`/p/<id>`),
add a free Firebase project. ~5 minutes.

## 1. Create a project
1. Go to <https://console.firebase.google.com> → **Add project**
2. Name it (e.g. `portfolio-builder`) → disable Analytics (optional) → Create

## 2. Enable Google sign-in
1. **Build → Authentication → Get started**
2. **Sign-in method → Google → Enable** → pick a support email → Save

## 3. Create the database
1. **Build → Firestore Database → Create database**
2. Start in **production mode** → choose a location → Create
3. Open the **Rules** tab and paste this, then **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolios/{id} {
      allow read: if true;                                  // anyone can view a shared portfolio
      allow create: if request.auth != null;               // must be signed in to create
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.ownerId;       // only the owner can edit
    }
  }
}
```

## 4. Get your web config
1. Project **⚙ Settings → General → Your apps → Web (`</>`)**
2. Register the app (any nickname) → copy the `firebaseConfig` values

## 5. Put the values in `.env`
Open `.env` in the project root and fill in:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=portfolio-builder.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-builder
VITE_FIREBASE_STORAGE_BUCKET=portfolio-builder.appspot.com
VITE_FIREBASE_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef
```

Then restart the dev server: `npm run dev`

## 6. Authorized domains
Firebase Console → **Authentication → Settings → Authorized domains** →
`localhost` is there by default. Add your deploy domain later
(e.g. `your-site.netlify.app`).

## Deploying (Netlify/Vercel)
`.env` is gitignored, so add the same `VITE_FIREBASE_*` variables in your
host's **Environment Variables** settings.

---

### What you get once configured
- **Sign in with Google** button (builder nav + editor)
- **Publish** button in the editor → saves to Firestore, returns a short
  public link `/p/<id>` (auto-copied)
- Owners can re-publish to update; anyone with the link can view.
