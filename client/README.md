# Document Viewer Client

This directory contains the React 18 single-page client. Vite provides the development server and proxies API requests to the Django backend.

## Prerequisites

- Node.js and npm
- The Django API running at `http://localhost:8000` when using API-backed screens

## Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:3000>. API requests beginning with `/api` are forwarded to Django by `vite.config.js`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the client into the repository's `static/dist/` directory |
| `npm run preview` | Serve the most recent production build locally |
| `npm run lint` | Run ESLint over the client source |

The client includes registration and login screens, protected document and profile views, a user list, and an admin view. Document operations use the Django API; supported upload types and size limits are enforced by the backend.

For backend setup, database configuration, API routes, and test instructions, see the [project README](../README.md).
