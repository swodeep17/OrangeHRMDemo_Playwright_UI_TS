/**
 * config/env.config.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 * FILE LOCATION: config/env.config.ts  (at project root level)
 *
 * Single source of truth for ALL environment variables, URLs, timeouts,
 * session paths, and credentials.
 *
 * CREDENTIAL FLOW:
 *   Local     → .env file        (loaded here via dotenv — git-ignored)
 *   GitHub CI → GitHub Secrets   (injected as env vars — same process.env read)
 *   Jenkins   → Jenkins Creds    (injected via withCredentials block in Jenkinsfile)
 *   Azure DvOps→ Variable Groups (injected as env vars in azure-pipelines.yml)
 *   Azure KV  → SDK fetch        (see commented block below — enterprise use)
 *
 * In ALL cases, code only reads process.env — nothing changes in this file.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import 'dotenv/config'; // loads .env → process.env (silent no-op if file missing — safe in CI)

// ── Environment ───────────────────────────────────────────────────────────────

export type EnvName = 'dev' | 'staging' | 'prod';

const ENV = (process.env['ENV'] ?? 'dev') as EnvName;

const BASE_URLS: Record<EnvName, string> = {
  dev:     'https://opensource-demo.orangehrmlive.com',
  staging: 'https://staging-orangehrm.example.com',   // replace with real staging URL
  prod:    'https://prod-orangehrm.example.com',       // replace with real prod URL
};

// ── URLs ──────────────────────────────────────────────────────────────────────
export const BASE_URL    = BASE_URLS[ENV];
export const LOGIN_PATH  = '/web/index.php/auth/login';
export const LOGIN_URL   = `${BASE_URL}${LOGIN_PATH}`;
export const HEALTH_PATH = '/web/index.php/auth/login'; // used by global setup health-check

// ── Timeouts (ms) ─────────────────────────────────────────────────────────────
export const DEFAULT_TIMEOUT    = 40_000;
export const EXPECT_TIMEOUT     = 5_000;
export const NAVIGATION_TIMEOUT = 30_000;

// ── Workers & Parallelism ─────────────────────────────────────────────────────
// CI: fixed workers to match Azure VM vCPU count (4 is typical for Standard_D2s_v3)
// Local: Playwright auto-detects CPU count
export const WORKERS = process.env['CI'] ? 4 : undefined;

// ── Session storage file paths ────────────────────────────────────────────────
// Saved by global.setup.ts — loaded by fixtures.ts per scenario.
// MUST be git-ignored (.sessions/ is in .gitignore).
export const SESSION_DIR = '.sessions';
export const SESSION_PATHS: Record<string, string> = {
  superadmin:  `${SESSION_DIR}/superadmin.json`,
  clientadmin: `${SESSION_DIR}/clientadmin.json`,
  ess:         `${SESSION_DIR}/ess.json`,
};

// ── Test data paths ───────────────────────────────────────────────────────────
export const USERS_JSON_PATH     = 'test-data/users.json';
export const QUARANTINE_LOG_PATH = 'test-results/quarantine.json'; // flaky test registry

// ── Credentials (resolved from .env / CI secrets) ─────────────────────────────
// These are read ONCE at startup. session_util.ts imports CREDENTIALS directly.
export const CREDENTIALS: Record<string, { username: string; password: string }> = {
  superadmin: {
    username: process.env['SUPERADMIN_USER'] ?? '',
    password: process.env['SUPERADMIN_PASS'] ?? '',
  },
  clientadmin: {
    username: process.env['CLIENTADMIN_USER'] ?? '',
    password: process.env['CLIENTADMIN_PASS'] ?? '',
  },
  ess: {
    username: process.env['ESS_USER'] ?? '',
    password: process.env['ESS_PASS'] ?? '',
  },
};

// ── Environment safety guard ──────────────────────────────────────────────────
// global.setup.ts compares BASE_URL against this value and aborts if mismatched.
// Set EXPECTED_ENV_URL in .env or CI to prevent accidental runs against PROD.
export const EXPECTED_ENV_URL = process.env['EXPECTED_ENV_URL'] ?? BASE_URL;

// ── Active environment (for logging) ─────────────────────────────────────────
export const ACTIVE_ENV = ENV;

// ═══════════════════════════════════════════════════════════════════════════════
// AZURE KEY VAULT  (enterprise — uncomment when needed)
// ───────────────────────────────────────────────────────────────────────────────
// Prerequisites:
//   npm install @azure/keyvault-secrets @azure/identity
//   Set AZURE_VAULT_URL=https://your-vault.vault.azure.net in .env or CI secrets
//   Grant your Service Principal "Key Vault Secrets User" role in Azure Portal
//
// When AZURE_VAULT_URL is present, session_util.ts fetches creds from Key Vault
// instead of process.env — no other code changes needed.
// ═══════════════════════════════════════════════════════════════════════════════
// export const AZURE_VAULT_URL = process.env['AZURE_VAULT_URL'];