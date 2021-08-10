## Guidelines

- Rough copy. Don't be exact, because that would take too long. Just do what's needed to get it working, even if you have to create the code from scratch instead of converting.
  - If package doesn't exist in your ecosystem, forfeit it and mock it or skip it entirely if it isn't crucial to the learnings (in this case, auth & security).
- Additional notes may be provided for each file for context

## orbit-app

**Legend**

✅ Completely covered  
✔ Partial coverage (possibly skimmed or ignored)

**Checklist**

✅ root dir  
✅ `/public`

✅ `src/`

- App.js
  - The router specifying authenticated and public routes
  - FetchProvider uses Axios and provides authorization bearer headers. But a simple fetch wrapper will do.
  - AuthProvider wraps app providing auth Context
    - essentially, any route authenticated is checked with `.isAuthenticated` method from `AuthContext`.
    - Additionally, an Admin route, along with checking `isAuthenticated` will also check `isAdmin`.
  - Pay special attention to AuthProvider and AuthContext, as that's managing the auth details.

**Other**

`/finalized examples` has converted some more finalized forms of the corresponding files (refer to when you get to that point)

- authstore
- avatardropdown
- sidebar
