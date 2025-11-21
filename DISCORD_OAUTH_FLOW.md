# Discord OAuth2 Flow - Complete Guide

## Overview
This application uses **Discord OAuth2 Authorization Code Flow** for secure authentication. This is the recommended approach for server-side applications as it keeps the client secret secure on the backend.

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │      │   Backend   │      │   Discord   │
│ (React/TS)  │      │ (Node.js)   │      │     API     │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                     │
       │  1. Click Login    │                     │
       ├────────────────────>                     │
       │                    │                     │
       │  2. Redirect to    │                     │
       │     /auth/discord  │                     │
       ├────────────────────>                     │
       │                    │                     │
       │                    │  3. Redirect to     │
       │                    │     Discord OAuth   │
       │                    ├────────────────────>│
       │                    │                     │
       │  4. Discord Login  │                     │
       │    & Authorize     │                     │
       │<──────────────────────────────────────────┤
       │                    │                     │
       │  5. Redirect back  │                     │
       │     with code      │                     │
       │────────────────────>                     │
       │                    │                     │
       │                    │  6. Exchange code   │
       │                    │     for token       │
       │                    ├────────────────────>│
       │                    │                     │
       │                    │  7. Return token    │
       │                    │<────────────────────┤
       │                    │                     │
       │                    │  8. Get user info   │
       │                    ├────────────────────>│
       │                    │                     │
       │                    │  9. Return user     │
       │                    │<────────────────────┤
       │                    │                     │
       │  10. Save session  │                     │
       │      & redirect    │                     │
       │<────────────────────                     │
       │                    │                     │
       │  11. Fetch user    │                     │
       │      from session  │                     │
       ├────────────────────>                     │
       │                    │                     │
       │  12. Return user   │                     │
       │<────────────────────                     │
       │                    │                     │
```

## Implementation Details

### 1. Frontend (React)

#### Entry Point: `DiscordLogin.tsx`
- User clicks "Iniciar sesión con Discord"
- Redirects to backend: `${API_URL}/auth/discord`

#### App.tsx Authentication Check
```typescript
// On page load, check if authenticated
const response = await fetch(`${API_URL}/auth/user`, {
  credentials: 'include' // Send session cookies
});

if (response.ok) {
  const discordUser = await response.json();
  // User is authenticated
}
```

### 2. Backend (Node.js + Express)

#### Route 1: `/auth/discord` - Initiate OAuth
```javascript
app.get("/auth/discord", catchAsync(async (req, res) => {
  // Generate CSRF state token
  const state = crypto.randomBytes(16).toString('hex');
  req.session.oauthState = state;
  
  // Redirect to Discord
  const authUrl = `https://discord.com/api/oauth2/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${REDIRECT_URI}&` +
    `response_type=code&` +
    `scope=identify&` +
    `state=${state}`;
  
  res.redirect(authUrl);
}));
```

#### Route 2: `/auth/callback` - Handle Discord Callback
```javascript
app.get("/auth/callback", catchAsync(async (req, res) => {
  const { code, state } = req.query;
  
  // 1. Validate state (CSRF protection)
  if (state !== req.session.oauthState) {
    throw new Error('State mismatch');
  }
  
  // 2. Exchange code for access token
  const tokenResponse = await axios.post(
    "https://discord.com/api/oauth2/token",
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI
    }
  );
  
  const { access_token, refresh_token, expires_in } = tokenResponse.data;
  
  // 3. Get user info from Discord
  const userResponse = await axios.get(
    "https://discord.com/api/users/@me",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  
  // 4. Save user in session
  req.session.discordUser = {
    ...userResponse.data,
    accessToken: access_token,
    refreshToken: refresh_token,
    tokenExpiry: Date.now() + (expires_in * 1000)
  };
  
  // 5. Redirect to frontend
  res.redirect(`${FRONTEND_URL}/?auth=success`);
}));
```

#### Route 3: `/auth/user` - Get Current User
```javascript
app.get("/auth/user", (req, res) => {
  if (!req.session.discordUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json(req.session.discordUser);
});
```

#### Route 4: `/auth/logout` - Logout
```javascript
app.post("/auth/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ success: true });
});
```

## Security Features

### 1. CSRF Protection with State Parameter
- Backend generates random `state` token before redirecting to Discord
- Saved in session: `req.session.oauthState`
- Discord returns this state in callback
- Backend validates: `state === req.session.oauthState`
- Prevents cross-site request forgery attacks

### 2. httpOnly Cookies
```javascript
cookie: {
  httpOnly: true, // Cannot be accessed via JavaScript
  secure: true,   // HTTPS only in production
  sameSite: 'none' // Allow cross-domain (GitHub Pages → Render)
}
```

### 3. CORS Configuration
```javascript
res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL);
res.setHeader('Access-Control-Allow-Credentials', 'true');
```

### 4. Error Handling with OAuth2 Errors
- All errors follow RFC 6749 standard
- Errors redirect to frontend with descriptive messages
- Example: `/?auth=error&error_code=invalid_request&error_description=...`

### 5. catchAsync Wrapper
- Prevents unhandled promise rejections
- Automatically passes errors to error handler middleware
- Clean async/await code without try/catch everywhere

## Token Refresh (Future Implementation)

Your backend already saves `refresh_token` and `tokenExpiry`. To implement token refresh:

```javascript
async function refreshAccessToken(refreshToken) {
  const response = await axios.post(
    "https://discord.com/api/oauth2/token",
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken
    }
  );
  
  return response.data; // { access_token, expires_in, refresh_token }
}

// Check token expiry before API calls
if (Date.now() > req.session.discordUser.tokenExpiry) {
  const newTokens = await refreshAccessToken(
    req.session.discordUser.refreshToken
  );
  
  req.session.discordUser.accessToken = newTokens.access_token;
  req.session.discordUser.refreshToken = newTokens.refresh_token;
  req.session.discordUser.tokenExpiry = Date.now() + (newTokens.expires_in * 1000);
}
```

## Environment Variables

### Backend (.env.server)
```
DISCORD_CLIENT_ID=1432386430855938189
DISCORD_CLIENT_SECRET=uPLiqGZfG898lDrt1vTqtovni2iEv_Hq
DISCORD_REDIRECT_URI=https://mensajeria-ksc7.onrender.com/auth/callback
FRONTEND_URL=https://unaspartidillas.online
SESSION_SECRET=upg_secret_key_change_in_production_2025
NODE_ENV=production
PORT=3000
```

### Frontend (.env)
```
VITE_DISCORD_CLIENT_ID=1432386430855938189
VITE_API_URL=https://mensajeria-ksc7.onrender.com
VITE_SOCKET_URL=https://mensajeria-ksc7.onrender.com
```

## Discord Developer Portal Configuration

1. Go to: https://discord.com/developers/applications
2. Select your app (ID: 1432386430855938189)
3. OAuth2 → Redirects
4. Add redirect URI: `https://mensajeria-ksc7.onrender.com/auth/callback`
5. OAuth2 → Scopes: `identify`

## Testing the Flow

1. Visit: https://unaspartidillas.online
2. Enter LockScreen password
3. Click "Iniciar sesión con Discord"
4. Authorize on Discord
5. Should redirect back with user authenticated
6. Check browser console for logs
7. Check DevTools → Application → Cookies for `connect.sid`

## Debug Endpoint

Visit: https://mensajeria-ksc7.onrender.com/auth/debug

Shows configuration status (remove in production):
```json
{
  "clientId": "✅ Configurado",
  "clientSecret": "✅ Configurado",
  "redirectUri": "https://mensajeria-ksc7.onrender.com/auth/callback",
  "frontendUrl": "https://unaspartidillas.online",
  "nodeEnv": "production"
}
```

## Common Issues & Solutions

### Issue: "State mismatch"
**Cause**: Session cookie not being sent or cleared
**Solution**: Check CORS, ensure `credentials: 'include'` in fetch

### Issue: "401 Not authenticated"
**Cause**: Session not persisted or cookie not sent
**Solution**: Verify `sameSite: 'none'` and `secure: true` in production

### Issue: "Redirect URI mismatch"
**Cause**: Discord redirect URI doesn't match backend
**Solution**: Ensure Discord portal has exact URL: `https://mensajeria-ksc7.onrender.com/auth/callback`

### Issue: User not persisting after refresh
**Cause**: Session expired or not saved properly
**Solution**: Check session `maxAge` (currently 30 days) and ensure `req.session.save()` is called

## References

- [Discord OAuth2 Documentation](https://discord.com/developers/docs/topics/oauth2)
- [RFC 6749 - OAuth 2.0 Spec](https://tools.ietf.org/html/rfc6749)
- [Express Session Documentation](https://github.com/expressjs/session)
- [Medium Guide - Simple Discord OAuth2](https://medium.com/@anton.dessiatov/simple-discord-oauth2-tutorial-5e7fd86f3116)

## Credits

Implementation based on best practices from:
- Anton Orlov's Discord OAuth2 guide
- RFC 6749 OAuth 2.0 specification
- Discord official documentation
