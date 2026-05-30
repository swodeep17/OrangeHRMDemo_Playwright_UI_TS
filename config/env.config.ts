/**
 * config/env.config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for URLs, credentials, sessions, and timeouts.
 *
 * HOW CREDENTIALS REACH THIS FILE:
 *
 *   Local dev  →  .env file          (git-ignored, you create it manually)
 *   GitHub CI  →  GitHub Secrets     (Settings → Secrets → Actions)
 *   Azure DevOps→  Variable Groups   (Library → Variable Groups)
 *
 *   In ALL cases this file just reads process.env — nothing changes here.
 *   dotenv loads .env locally; CI injects secrets as env vars automatically.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'dotenv/config';
// ↑ Reads your local .env file → populates process.env
//   On CI this is a silent no-op — CI already has secrets in process.env

// ═══════════════════════════════════════════════════════════════════════════
// 1. ENVIRONMENT
// Which environment are we running against? Set ENV=dev/staging/prod in .env
// Defaults to 'dev' if not set.
// ═══════════════════════════════════════════════════════════════════════════

export type EnvName = 'dev' | 'staging' | 'prod';

const ENV = (process.env['ENV'] ?? 'dev') as EnvName;

// Add real staging/prod URLs when you have them
const BASE_URLS: Record<EnvName, string> = {
  dev:     'https://opensource-demo.orangehrmlive.com',
  staging: 'https://staging-orangehrm.example.com',
  prod:    'https://prod-orangehrm.example.com',
};

export const ACTIVE_ENV = ENV;
export const BASE_URL   = BASE_URLS[ENV];   // used everywhere as the app's root URL

// ═══════════════════════════════════════════════════════════════════════════
// 2. URLs
// All URLs are derived from BASE_URL so changing ENV changes everything.
// ═══════════════════════════════════════════════════════════════════════════

export const LOGIN_PATH = '/web/index.php/auth/login';
export const LOGIN_URL  = `${BASE_URL}${LOGIN_PATH}`;
// LOGIN_URL → used by session_util.ts when performing the actual UI login
//             during globalSetup to create storage state files

// Safety guard — set EXPECTED_ENV_URL in .env or CI secrets to prevent
// accidental test runs against production.
// global.setup.ts compares BASE_URL against this and aborts if mismatched.
export const EXPECTED_ENV_URL = process.env['EXPECTED_ENV_URL'] ?? BASE_URL;

// ═══════════════════════════════════════════════════════════════════════════
// 3. STORAGE STATE — Session file paths
//
// WHAT IS STORAGE STATE?
//   After a successful UI login, Playwright captures the browser's
//   cookies + localStorage and saves them to a .json file on disk.
//   On the next test, instead of logging in again through the UI,
//   Playwright just loads that .json file into the browser context —
//   the browser is already authenticated before the test even starts.
//
// WHO CREATES THESE FILES?
//   global.setup.ts → calls session_util.saveSession() for each user type
//   session_util.saveSession() → does the UI login once → calls:
//     context.storageState({ path: SESSION_PATHS['superadmin'] })
//   This saves cookies + localStorage → .sessions/superadmin.json ✅
//
// WHO LOADS THESE FILES?
//   playwright.config.ts → each project has:
//     use: { storageState: SESSION_PATHS['superadmin'] }
//   Playwright reads that file and pre-loads it into every test's
//   browser context → tests start already logged in, no UI login needed.
//
// LIFECYCLE:
//   Local  → created once, reused across runs (skipped if file exists)
//   CI     → created fresh on every pipeline run (runner starts clean)
//   Git    → NEVER committed (.sessions/ is in .gitignore)
// ═══════════════════════════════════════════════════════════════════════════

export const SESSION_DIR = '.sessions';

export const SESSION_PATHS: Record<string, string> = {
  superadmin:  `${SESSION_DIR}/superadmin.json`,
  clientadmin: `${SESSION_DIR}/clientadmin.json`,  // created only when CLIENTADMIN_USER is set
  ess:         `${SESSION_DIR}/ess.json`,           // created only when ESS_USER is set
};
// Adding a new user type later → add one line here + one project in playwright.config.ts

// ═══════════════════════════════════════════════════════════════════════════
// 4. CREDENTIALS
//
// Read from process.env (populated by .env locally, GitHub Secrets on CI).
// session_util.ts imports CREDENTIALS and uses them during the UI login
// that creates the storage state files above.
//
// After storage state is created, credentials are NOT used again during tests —
// tests rely entirely on the saved session (no username/password in test code).
// ═══════════════════════════════════════════════════════════════════════════

export const CREDENTIALS: Record<string, { username: string; password: string }> = {
  superadmin: {
    username: process.env['SUPERADMIN_USER'] ?? '',   // → .env: SUPERADMIN_USER=Admin
    password: process.env['SUPERADMIN_PASS'] ?? '',   // → .env: SUPERADMIN_PASS=admin123
  },
  clientadmin: {
    username: process.env['CLIENTADMIN_USER'] ?? '',  // → add to .env when ready
    password: process.env['CLIENTADMIN_PASS'] ?? '',  // → add to .env when ready
  },
  ess: {
    username: process.env['ESS_USER'] ?? '',          // → add to .env when ready
    password: process.env['ESS_PASS'] ?? '',          // → add to .env when ready
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. TIMEOUTS (ms)
// Centralised here so changing one value updates every test.
// ═══════════════════════════════════════════════════════════════════════════

export const DEFAULT_TIMEOUT    = 40_000;   // max time for a single test step
export const EXPECT_TIMEOUT     =  5_000;   // max time for expect() assertions
export const NAVIGATION_TIMEOUT = 30_000;   // max time for page.goto() / waitForURL()

// ═══════════════════════════════════════════════════════════════════════════
// 6. PARALLELISM
// CI uses 1 worker (set in playwright.config.ts via process.env.CI).
// Defined here for reference — not directly used by playwright.config.ts
// since that reads process.env.CI directly.
// ═══════════════════════════════════════════════════════════════════════════

export const WORKERS = process.env['CI'] ? 1 : undefined;
// undefined → Playwright auto-detects based on your machine's CPU count

// ═══════════════════════════════════════════════════════════════════════════
// 7. TEST DATA PATHS
// ═══════════════════════════════════════════════════════════════════════════

export const USERS_JSON_PATH     = 'test-data/users.json';
export const QUARANTINE_LOG_PATH = 'test-results/quarantine.json';

// ═══════════════════════════════════════════════════════════════════════════
// AZURE KEY VAULT (enterprise — uncomment when needed)
// ─────────────────────────────────────────────────────────────────────────
// When your company rotates credentials every 90 days, hardcoding them
// in GitHub Secrets becomes a maintenance burden. Key Vault solves this —
// the secret updates in ONE place and all pipelines pick it up automatically.
//
// To enable:
//   npm install @azure/keyvault-secrets @azure/identity
//   Set AZURE_VAULT_URL in .env or CI secrets
//   session_util.ts already has the Azure block ready — just uncomment it
// ═══════════════════════════════════════════════════════════════════════════
// export const AZURE_VAULT_URL = process.env['AZURE_VAULT_URL'];