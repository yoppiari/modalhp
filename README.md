# Tools UMKM - Local Development

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Getting Started

To run the application locally, you can use the provided `start-dev.sh` script which will start both the backend and frontend servers.

### 1. Run the Startup Script

```bash
./start-dev.sh
```

This script will:
1.  Install dependencies for both frontend and backend automatically if they are missing.
2.  Start the backend server on port 3000 (default).
3.  Start the frontend server on port 5173 (default).

### Manual Setup (Alternative)

If you prefer to run them separately:

**Backend:**

```bash
cd server
npm install
npm run dev
```

**Frontend:**

```bash
npm install
npm run dev
```

## Project Structure

- `src/`: Vue.js Frontend
- `server/`: Node.js/Express Backend (with Prisma)
