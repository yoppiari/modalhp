# AI & Development Rules

1.  **NO HARDCODING**: **STRICTLY FORBIDDEN**.
    -   **Ports**: Never hardcode ports (e.g., 3000, 8080). Use `process.env.PORT` or configuration files.
    -   **URLs**: Never hardcode API URLs or external service links (e.g., `http://localhost`, `https://wa.me`). Use environment variables or `src/utils/constants.js`.
    -   **Credentials**: Never hardcode secrets, keys, or tokens. Use `.env`.
    -   **Magic Numbers/Strings**: Extract repeated values into constants.
2.  **MOCK DATA**: Only use mock data if explicitly requested by the user. Otherwise, implement proper data fetching or logic.
3.  **DESIGN CONSISTENCY**: All new pages must adhere to the established layout to ensure a native app feel:
    - **Header**: Standard title + back button/action.
    - **Footer**: Standard 3-item navigation (Home, Bonus, Settings).
4.  **VPS DEPLOYMENT** (Production):
    - **Target Directory**: `/opt/modalhp/` (NOT `/tmp/` or `/root/`)
    - **Docker Compose Project**: `modalhp` (container name: `modalhp-app-1`)
    - **Deploy Command**:
      ```bash
      ssh root@72.62.127.3 "cd /opt/modalhp && git pull origin main && docker compose build app && docker compose up -d app"
      ```
    - **NEVER create new containers**: Always rebuild the existing `modalhp-app` container
    - **Traefik Integration**: The app uses Traefik as reverse proxy (labels in docker-compose.yml)
    - **DO NOT run**: `docker compose up -d --build` without specifying service (will rebuild ALL services)
    - **Cleanup**: If accidental new project created, immediately run:
      ```bash
      ssh root@72.62.127.3 "cd /path/to/wrong/project && docker compose down && rm -rf /path/to/wrong/project"
      ```
5.  **SSH CREDENTIALS**: Never hardcode SSH credentials in workflow files or commit them
    - Use GitHub Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_SSH_PORT`
    - For manual deploy: Use SSH keys authentication (no password in scripts)
