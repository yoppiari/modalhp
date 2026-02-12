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
