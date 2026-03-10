import { Page, Locator } from '@playwright/test';

export class AdminPage {
  page: Page;

  // Side menu
  admin: Locator;
  userManagement: Locator;
  job: Locator;
  organization: Locator;

  // Header
  adminHeader: Locator;

  // Admin page elements
  searchBox: Locator;
  searchButton: Locator;
  resetButton: Locator;
  addButton: Locator;
  userRoleDropdown: Locator;
  statusDropdown: Locator;
  userRoleOptions: Locator;
  statusOptions: Locator;
  employeeNameInput: Locator;
  employeeAutoOptions: Locator;
  usernameInput: Locator;
  userPassword: Locator;
  userConfirmPassword: Locator;
  saveButton: Locator;
  spinner: Locator;
  toast: Locator;
  toastMessage: Locator;

  //Users webtable
  userTable: Locator;


  constructor(page: Page) {
    this.page = page;
    // Side menu locators (role/text based)
    this.admin = page.getByRole('link', { name: 'Admin' });
    this.userManagement = page.locator('span:has-text("User Management")');
    this.job = page.locator('span').filter({ hasText: 'Job' });
    this.organization = page.getByText('Organization', { exact: true });
    // Header locator
    this.adminHeader = page.getByRole('heading', { name: 'Admin' });
    // Admin page elements
    this.searchBox = page.getByPlaceholder('Search');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    // USER ROLE DROPDOWN
    this.userRoleDropdown = page.locator("//label[text()='User Role']/following::div[contains(@class,'oxd-select-wrapper')][1]");
    this.userRoleOptions = page.locator("div.oxd-select-dropdown div[role='option']");
    // STATUS DROPDOWN
    this.statusDropdown = page.locator("//label[text()='Status']/following::div[contains(@class,'oxd-select-wrapper')][1]");
    this.statusOptions = page.locator("div.oxd-select-dropdown div[role='option']");
    // EMPLOYEE AUTOCOMPLETE
    this.employeeNameInput = page.locator("input[placeholder='Type for hints...']");
    this.employeeAutoOptions = page.locator("div.oxd-autocomplete-dropdown div[role='option']");

    this.usernameInput = page.locator("//input[@class='oxd-input oxd-input--active'][2]");
    //this.usernameInput = page.locator("input.oxd-input.oxd-input--active").nth(1);
    this.userPassword = page.locator('input[type="password"]').first();
    this.userConfirmPassword = page.locator('input[type="password"]').last();
    this.saveButton = page.getByRole('button', { name: /Save/i });

    // Spinner & toast (from your screenshots)
    this.spinner = page.locator('.oxd-loading-spinner, .oxd-loading-spinner-container');
    this.toast = page.locator('.oxd-toast-content');
    this.toastMessage = page.locator(".oxd-toast-content .oxd-text--toast-message");


    this.userTable = page.getByRole('table');

  }

  async selectRole(inputRole: string) {
    // Normalize input from feature/json
    // "clientadmin" → "Admin"
    // "ess" → "ESS"
    let normalized: string;

    if (inputRole.toLowerCase().includes("admin")) {
      normalized = "Admin";
    } else if (inputRole.toLowerCase().includes("ess")) {
      normalized = "ESS";
    } else {
      normalized = inputRole; // in case of future roles
    }

    // Open dropdown
    await this.userRoleDropdown.click();

    // Select option from dropdown list
    await this.userRoleOptions
      .filter({ hasText: normalized })
      .first()
      .click();
  }

  async selectStatus(status: string) {
    // Open dropdown
    await this.statusDropdown.click();

    // Click matching option
    await this.statusOptions
      .filter({ hasText: status })
      .first()
      .click();
  }

  async searchAndSelectEmployee(fullName: string) {
    // Clear the input first
    await this.employeeNameInput.fill("");

    // Type employee name
    await this.employeeNameInput.fill(fullName);

    // Wait for dropdown to appear
    await this.page.waitForTimeout(800); // OrangeHRM shows "Searching..." momentarily

    // Handle Searching...
    const options = this.employeeAutoOptions;

    // Wait until either:
    //  - dropdown options appear, OR
    //  - "No Records Found" appears
    await this.page.waitForTimeout(500);

    const optionsCount = await options.count();

    if (optionsCount === 0) {
      throw new Error(`No records found for employee: ${fullName}`);
    }

    // Click the first matching option (OrangeHRM always shows a single correct match)
    await options.first().click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async waitForSpinnerToDisappear() {
    // Spinner may appear twice. We will wait for hidden state safely.
    await this.spinner.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
  }

  async getToastMessage() {

    await this.toastMessage.waitFor({ state: 'visible', timeout: 8000 });
    return this.toastMessage.innerText();
  }

  async waitForToastToDisappear() {
    await this.toast.waitFor({ state: 'hidden', timeout: 8000 });
  }

  async waitForAddButton() {
    await this.addButton.waitFor({ state: 'visible', timeout: 10000 });
  }


  async saveUserAndWait(successText: string) {

    await this.clickSave();

    // 1) First spinner disappears
    await this.waitForSpinnerToDisappear();

    // 2) Read toast
    const toastMsg = await this.getToastMessage();
    if (!toastMsg.includes(successText)) {
      throw new Error(`Expected toast "${successText}" but got "${toastMsg}"`);
    }

    // 3) Wait toast fade-out (OrangeHRM auto-dismiss)
    await this.waitForToastToDisappear();

    // 4) Spinner shows again → wait again
    await this.waitForSpinnerToDisappear();

    // 5) Back to list → Add button visible
    await this.waitForAddButton();
  }




}
