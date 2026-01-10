# TaskManager (TaskManagerUI)

A small Angular (v20.x) frontend for managing tasks, versions and documents. This repository contains a standalone-component Angular application written in TypeScript and wired to a backend API (see ApiService).

Table of contents
- Quick start
- Available scripts
- What this project contains
- Architecture overview
  - Entry point & bootstrapping
  - Routing
  - ApiService (backend integration)
  - Authentication & guard
  - Pages & components
- Configuration
  - Changing the backend URL
  - Recommended environment setup
- Development tips
  - Debugging in VS Code
  - Running tests
  - Watch/build for development
- Troubleshooting
- Contributing
- License

Quick start

1. Install dependencies
   - Node (recommended >= 18) and npm are required.
   - From the repository root:
     ```
     npm install
     ```

2. Start the development server
   ```
   npm start
   ```
   Open http://localhost:4200/ in your browser. The app uses Angular's dev server (ng serve). The server will reload automatically when you change files.

3. Build for production
   ```
   npm run build
   ```
   The production build outputs optimized artifacts to the `dist/` directory.

4. Run unit tests
   ```
   npm test
   ```
   This runs the Karma test runner configured by Angular.

Available package scripts (from package.json)
- npm start — ng serve (development server)
- npm run build — ng build (production/default configuration)
- npm run watch — ng build --watch --configuration development (rebuild on changes)
- npm test — ng test (Karma)

What this project contains
- Angular standalone components under src/app/Pages and src/app/Shared
- src/app/api-service.ts — centralized HttpClient wrapper describing how the frontend talks to the backend
- src/app/auth.ts — a simple route guard checking localStorage for "userId"
- src/app/app.routes.ts — route definitions (tasks, versions, documents, login, register, etc.)
- src/app/app.config.ts and src/main.ts — application providers and bootstrap configuration
- tsconfig.json — TypeScript and Angular compiler strict settings

Architecture overview

Entry point & bootstrapping
- main.ts bootstraps the application via bootstrapApplication(App, appConfig).
- appConfig (src/app/app.config.ts) sets providers: router (provideRouter(routes)), HttpClient (provideHttpClient()), and change detection/ error listeners.

Routing
- Defined in src/app/app.routes.ts. Key routes:
  - '/' or '/task' -> Tasks component (protected by Auth guard)
  - '/login' -> Login component
  - '/register' -> Register component
  - '/tasks/:id/versions' -> TaskVersion component
  - '/document/...': nested routes for versions and documents
- The Auth guard (src/app/auth.ts) checks localStorage for "userId". If missing it redirects to /login.

ApiService (backend integration)
- Implemented in src/app/api-service.ts.
- Base URL is currently hard-coded:
  - private apiUrl = "https://localhost:7188";
- The service exposes endpoints for:
  - Tasks: GetAllTask, GetTaskById, CreateTask, UpdateTaskById, DeleteTaskById, search by title/date.
  - Versions: GetAllVersionsByTaskId, Create/GetNewVersions, ChangeVersionStatus, GetBackVersion, GetVersionByVersionId.
  - Documents: CreateDocument, GetAllDocuments, GetDocumentById, UpdateDocumentById, DeleteDocument.
  - Users: CreateUser, UpdateUser, GetAllUsers, GetUserByEmail/Id, DeleteUserById, Login
- All requests use HttpClient. Some endpoints are POST/PATCH/DELETE as appropriate.

Authentication & guard
- Login component (src/app/Pages/login/login.ts) POSTs to /users/Login with { email, password }.
- Successful login expects a response containing userId. Login saves:
  localStorage.setItem("userId", userId.toString());
- Auth guard (src/app/auth.ts) verifies this "userId" to allow navigation to protected routes.
- Logging out removes "userId" from localStorage.

Pages & components (high-level)
- src/app/Pages/tasks — main tasks list, search and actions; opens AddTask modal and navigates to versions.
- src/app/Pages/task-version — task version listing and actions (see routes).
- src/app/Pages/document — document list and operations for a version.
- src/app/Pages/add-task, add-document, register, user — forms for create/update flows.

Configuration

Changing the backend URL
- Current quick change: edit src/app/api-service.ts and update the private apiUrl value:
  ```ts
  private apiUrl = "https://api.example.com"; // change this
  ```
- Recommended approach: add Angular environment files (e.g., src/environments/environment.ts and environment.prod.ts) and import them into ApiService so builds use the correct base URL per environment.

Example recommended refactor:
- Create src/environments/environment.ts
  ```ts
  export const environment = { apiUrl: 'http://localhost:7188' }
  ```
- Then in ApiService:
  ```ts
  import { environment } from '../environments/environment';
  private apiUrl = environment.apiUrl;
  ```

Note about HTTPS backend
- The ApiService default uses https://localhost:7188. Ensure the backend is running and serving HTTPS with valid certs or switch to http for local development.

Development tips

Debugging in VS Code
- A simple launch configuration exists in .vscode/launch.json. Use the "Launch Chrome" configuration (or create one) to attach the Chrome debugger to the running ng serve instance (port 4200).
- Put breakpoints in TypeScript and run the VS Code debugger to step through client-side code.

Working with strict TypeScript/Angular options
- tsconfig.json and angularCompilerOptions enable strict checks. This helps catch bugs early but may require typing adjustments when adding code.
- If you prefer a less strict developer experience while prototyping, relax specific flags in tsconfig.json (not recommended for long-term).

Running tests
- Unit tests run with Karma configured in angular.json.
- Use npm test to run tests in watch mode (Karma default) or CI-run them once.

Watch builds
- For continuous rebuilds during development:
  ```
  npm run watch
  ```

Troubleshooting

Backend not reachable / CORS
- If the UI fails to contact the API, you'll see browser console errors or ApiService errors. Typical causes:
  - Backend not running (start your API at the expected port).
  - CORS blocked: allow the dev server origin (http://localhost:4200) on the backend.
  - HTTPS certificate trust issues: use http in development or trust local dev certs.

Login returns 401
- Login component maps 401 to "Kullanıcı adı veya şifre hatalı".
- Verify request payload and backend login endpoint. Inspect network tab to see request/response.

TypeScript or template errors
- With strictTemplates and strict TypeScript, template errors may prevent compilation. Review the error output; ensure all component inputs/outputs and template references are typed correctly.

Common quick checks
- Confirm Node version via node -v
- Reinstall deps with npm ci if dependency issues arise
- Clear Angular cache: npx ng cache clean

Contributing
- Feel free to open issues and PRs.
- Suggested improvements:
  - Move API base URL to environment files
  - Add e2e tests (Cypress or Playwright)
  - Add more unit tests for critical components/services
  - Improve styling: include Bootstrap in styles or via CDN if relied upon

Example curl (login)
- You can test the backend login endpoint directly (replace host/port as needed):
  ```
  curl -X POST https://localhost:7188/users/Login \
    -H "Content-Type: application/json" \
    -d '{"email":"user@example.com","password":"yourpassword"}'
  ```

Security note
- Storing only userId in localStorage is a minimal approach. Consider using JWTs or other secure tokens with short expiry and refresh strategies for production apps.

License
- Add a LICENSE file to the repo if you plan to open-source the project. Example: MIT.

Final notes
- This repo is a compact Angular UI wired to a backend API; most runtime behavior depends on a compatible backend available at the configured apiUrl.
- For any architectural changes (for example switching to environment variables, adding authentication tokens, or adding state management), look at src/app/api-service.ts, src/app/auth.ts and src/app/app.routes.ts as the first touch points.

If you'd like, I can:
- Add an environment file example and change ApiService to use it.
- Add a small CONTRIBUTING.md template or a sample LICENSE file.
- Provide a CI workflow example for building and testing the app in GitHub Actions.
