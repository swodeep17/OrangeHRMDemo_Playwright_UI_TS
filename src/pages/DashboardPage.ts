import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  page: Page;

  //Menu side panel
  search: Locator;
  admin: Locator;
  pim: Locator;
  dashboard: Locator;
  myInfo: Locator;
  sideMenu: Locator;
  menuList: Locator;

  //Header
  profileAvatar: Locator;
  logout: Locator;
  dashboardTitle: Locator;

  
// Reusable locators
  saveButton: Locator;
  spinner: Locator;
  // NEW: precise toast locators
  toastSuccess: Locator;
  toastError: Locator;
  toastMessage: Locator;
  addButton: Locator;



  constructor(page: Page) {
    this.page = page;
    // Side menu locators (role/text based)
    this.search = page.getByPlaceholder('Search');
    this.sideMenu = page.getByRole('navigation').first();
    this.menuList = page.getByRole('list');
    this.admin = page.getByRole('link', { name: 'Admin' });
    this.pim = page.getByRole('link', { name: 'PIM' });
    this.dashboard = page.getByRole('link', { name: 'Dashboard' });
    this.myInfo = page.getByRole('link', { name: 'My Info' });
    // Header locators
    this.profileAvatar = page.locator('img.oxd-userdropdown-img'); // No role/label, keep as is
    this.logout = page.getByRole('menuitem', { name: 'Logout' });
    this.dashboardTitle = page.getByRole('heading', { name: /dashboard/i });

    //reusable locators
    this.saveButton = page.getByRole('button', { name: /Save/i });
    this.addButton = page.getByRole('button', { name: 'Add' });
    
// Spinner (overlay/container)
    this.spinner = page.locator('.oxd-loading-spinner, .oxd-loading-spinner-container');

    //Use specific toast containers (avoid strict mode on multiple toasts)
    this.toastSuccess = page.locator('.oxd-toast-content.oxd-toast-content--success');
    this.toastError   = page.locator('.oxd-toast-content.oxd-toast-content--error');

    // Message inside the currently visible toast
    this.toastMessage = page.locator('.oxd-toast-content .oxd-text--toast-message');


  }

  async userLogout() {
    await this.profileAvatar.click();
    await expect(this.logout).toBeVisible();
    //await this.logout.waitFor({state:"visible"});

    await this.logout.click();
  }


   async clickSave() {
  await this.saveButton.click();
}

  async waitForSpinnerToDisappear(timeout = 15000) {
    // Spinner may not appear every time; ignore if not visible within timeout
    await this.spinner.first().waitFor({ state: 'hidden', timeout }).catch(() => {});
  }

  /**
   * Wait for either success or error toast to appear.
   * - On error, throws with error text.
   * - On success, asserts expected text and waits for auto-dismiss.
   */
  async waitForToastAndValidate(expectedSuccessText: string) {
    // Appear: success OR error
    const appeared = await Promise.race([
      this.toastSuccess.waitFor({ state: 'visible', timeout: 12000 }).then(() => 'success'),
      this.toastError.waitFor({ state: 'visible',  timeout: 12000 }).then(() => 'error'),
    ]).catch(() => { throw new Error('No toast appeared within 12s'); });

    // Read whatever toast message is visible
    const msg = (await this.toastMessage.first().isVisible())
      ? await this.toastMessage.first().innerText()
      : '';

    if (appeared === 'error') {
      throw new Error(`Operation failed: ${msg || 'Error toast shown'}`);
    }

    // Success path: validate the message text (e.g., "Successfully Saved")
    expect(msg).toContain(expectedSuccessText);

    // Wait for the success toast to auto-dismiss
    await this.toastSuccess.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  }

  /**
   * Full save flow:
   * - click Save
   * - spinner hidden
   * - toast success/error handling
   * - spinner hidden again (brief flicker after toast)
   * - end state: Add button visible
   */
  async saveUserAndWait(successText: string) {
    await this.clickSave();

    // 1) First spinner disappears
    await this.waitForSpinnerToDisappear();

    // 2) Toast handling (assert success or throw on error)
    await this.waitForToastAndValidate(successText);

    // 3) Spinner may appear again briefly → wait to settle
    await this.waitForSpinnerToDisappear();

    // 4) End-state cue: back to list with Add button visible
    await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
  }

}

 