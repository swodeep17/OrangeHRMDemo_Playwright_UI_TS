/**
 * session_util.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Saves and checks Playwright storageState (cookies + localStorage) files
 * so login is performed only once per user type per test run.
 *
 * CREDENTIAL RESOLUTION ORDER:
 *   1. Local  → .env file  (loaded by env.config.ts via dotenv)
 *   2. CI     → GitHub Actions Secrets (injected as env vars — same process.env read)
 *   3. Fallback for clientadmin/ess → users.json (written by @createEmp flow)
 *
 * // ── Azure Key Vault (future / enterprise) ─────────────────────────────────
 * // Uncomment the Azure block below and install:
 * //   npm install @azure/keyvault-secrets @azure/identity
 * // Set AZURE_VAULT_URL=https://your-vault.vault.azure.net in .env or CI secrets.
 * // When AZURE_VAULT_URL is present, credentials are fetched from Key Vault
 * // instead of .env / GitHub Secrets.
 * // ──────────────────────────────────────────────────────────────────────────
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs             from 'fs';
import { Browser }    from '@playwright/test';
import { SESSION_DIR, SESSION_PATHS, LOGIN_URL, CREDENTIALS } from '../../config/env.config';
import { readUsers }  from './users-util';

// ── Azure Key Vault (commented — uncomment when needed) ──────────────────────
// import { SecretClient }           from '@azure/keyvault-secrets';
// import { DefaultAzureCredential } from '@azure/identity';
//
// let _kvClient: SecretClient | null = null;
//
// function getKvClient(): SecretClient {
//   if (!_kvClient) {
//     const vaultUrl = process.env['AZURE_VAULT_URL']!;
//     _kvClient = new SecretClient(vaultUrl, new DefaultAzureCredential());
//   }
//   return _kvClient;
// }
//
// async function getSecretFromVault(name: string): Promise<string> {
//   const secret = await getKvClient().getSecret(name);
//   if (!secret.value) throw new Error(`[session_util] Azure secret "${name}" is empty`);
//   return secret.value;
// }
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

interface Credentials { username: string; password: string }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureSessionDir(): void {
  if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });
}

/** Returns true if a valid session file already exists for this user type */
export function sessionExists(userType: string): boolean {
  const filePath = SESSION_PATHS[userType];
  return !!filePath && fs.existsSync(filePath);
}

/**
 * Resolves credentials for a given user type.
 *
 * Priority:
 *   1. env vars (from .env locally, GitHub Secrets in CI)
 *   2. users.json fallback for clientadmin / ess
 *
 * // To enable Azure Key Vault:
 * //   - Uncomment the Azure block above
 * //   - Replace step 1 below with: return await getSecretFromVault(...)
 */
async function resolveCredentials(userType: string): Promise<Credentials> {

  // ── Azure Key Vault (commented — replace step 1 below when using AKV) ───────
  // if (process.env['AZURE_VAULT_URL']) {
  //   return {
  //     username: await getSecretFromVault(`${userType.toUpperCase()}-USER`),
  //     password: await getSecretFromVault(`${userType.toUpperCase()}-PASS`),
  //   };
  // }
  // ─────────────────────────────────────────────────────────────────────────────

  // Step 1 — env vars (.env locally, GitHub Secrets in CI)
  const envCreds = CREDENTIALS[userType];
  if (envCreds?.username && envCreds?.password) {
    return envCreds;
  }

  // Step 2 — fallback: users.json (clientadmin / ess written by @createEmp flow)
  const users = readUsers();
  const fallbackMap: Record<string, () => Credentials | undefined> = {
    clientadmin: () => users.clientadmins?.[0]?.adminCredentials,
    ess:         () => users.essUsers?.[0]?.adminCredentials,
  };

  const fallback = fallbackMap[userType]?.();
  if (fallback) return fallback;

  throw new Error(
    `[session_util] No credentials found for "${userType}". ` +
    `Set ${userType.toUpperCase()}_USER / ${userType.toUpperCase()}_PASS in .env (local) ` +
    `or GitHub Secrets (CI).`
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Performs login once, saves storageState to .sessions/<userType>.json.
 * Call in BeforeAll hooks — skipped automatically if sessionExists() is true.
 */
export async function saveSession(browser: Browser, userType: string): Promise<void> {
  ensureSessionDir();

  const sessionPath = SESSION_PATHS[userType];
  if (!sessionPath) throw new Error(`[session_util] Unknown userType: "${userType}"`);

  const { username, password } = await resolveCredentials(userType);

  const context = await browser.newContext();
  const page    = await context.newPage();

  await page.goto(LOGIN_URL);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard**', { timeout: 30_000 });

  await context.storageState({ path: sessionPath });
  await context.close();

  console.log(`[session_util] Session saved for "${userType}" → ${sessionPath}`);
}