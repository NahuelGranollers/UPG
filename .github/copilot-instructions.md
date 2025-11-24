# UPG Community Hub - AI Coding Instructions

## 🏗 Project Architecture
- **Stack**: React (Vite) + TypeScript frontend, Node.js (Express) + Socket.IO backend.
- **Styling**: Tailwind CSS (v3/v4).
- **Communication**: Real-time bidirectional communication via Socket.IO. REST APIs used primarily for Auth (Discord OAuth2).
- **Database**: SQLite (`better-sqlite3`) for local development, PostgreSQL (`pg`) for production.
- **Hosting**: Frontend on GitHub Pages, Backend on Render.

## 📂 Key Directories & Files
- `server/index.js`: **CRITICAL**. Monolithic entry point containing all backend logic, Socket.IO event handlers, and game state (Impostor, CS16).
- `services/socketService.ts`: Frontend singleton for managing Socket.IO connections.
- `cs16-game/`: Game assets and logic for the CS1.6 clone.
- `components/`: React components. Note `CS16Game.tsx` and `ImpostorGame.tsx` for game UIs.
- `config/discordUsers.ts`: Static mapping of Discord IDs to user metadata.

## 🔌 Socket.IO Patterns
- **Event Naming**: Use `domain:action` format (e.g., `user:join`, `message:send`, `impostor:create-room`).
- **State Management**:
  - **Frontend**: React Context (`SocketContext.tsx`) + `socketService.ts`.
  - **Backend**: In-memory `Map`s (`connectedUsers`, `impostorRooms`, `cs16Rooms`) in `server/index.js`.
- **Game State**: Server-authoritative. Clients send actions (`cs16:player-move`), server validates and broadcasts updates (`cs16:player-update`).

## 🎮 Game Logic (Impostor & CS16)
- **Impostor**: Logic resides in `server/index.js` under `Impostor Game Handlers`. State includes `voting`, `turnOrder`, `impostorId`.
- **CS16**: Logic in `server/index.js` under `CS16 Game Handlers`. Includes simple bot AI (`startBotAI`), collision detection, and hit registration.
- **Bots**: Server-controlled entities in CS16 mode.

## 🛡 Security & Auth
- **Auth**: Discord OAuth2. Session cookie `upg.sid`.
- **Admin**:
  - Hardcoded `ADMIN_DISCORD_ID` in `server/index.js`.
  - Password-based unlock via `/admin/unlock`.
  - Admin actions (ban, kick, clear) validated via `isAdminUser(userId)`.
- **Sanitization**: All user inputs sanitized via `xss` library before broadcast.

## 🚀 Development Workflow
- **Frontend**: `npm run dev` (Port 5173).
- **Backend**: `cd server && npm start` (Port 3000).
- **Env Vars**:
  - Frontend: `VITE_` prefix (e.g., `VITE_GEMINI_API_KEY`).
  - Backend: Standard `.env` (e.g., `DISCORD_CLIENT_ID`, `SESSION_SECRET`).

## 💡 Coding Conventions
- **Types**: Define shared interfaces in `types.ts` when possible.
- **Logs**: Use `winston` logger in backend (`logger.info`, `logger.error`) instead of `console.log`.
- **Error Handling**: Use `catchAsync` wrapper for Express routes.
- **File Edits**: When modifying `server/index.js`, be extremely careful as it holds state for multiple features. Search for specific event handlers before adding new ones.
