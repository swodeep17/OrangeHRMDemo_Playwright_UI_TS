// config/global.setup.ts
import { chromium } from '@playwright/test';
import { saveSession, sessionExists } from '../src/utils/session_util';
import { CREDENTIALS } from './env.config';

export default async function globalSetup() {
  const browser = await chromium.launch();

  // superadmin — always required
  if (!sessionExists('superadmin')) {
    await saveSession(browser, 'superadmin');
  }

  // clientadmin — only if credentials exist (set after @createEmp + @employeeRoleMapping)
  if (!sessionExists('clientadmin') && CREDENTIALS['clientadmin']?.username) {
    await saveSession(browser, 'clientadmin');
  }

  // ess — only if credentials exist (same reason)
  if (!sessionExists('ess') && CREDENTIALS['ess']?.username) {
    await saveSession(browser, 'ess');
  }

  await browser.close();
}