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
  usernameInput: Locator;
  userTable: Locator;

  constructor(page: Page) {
    this.page = page;
    // Side menu locators (role/text based)
    this.admin = page.getByRole('link', { name: 'Admin' });
    this.userManagement = page.getByRole('link', { name: 'User Management' });
    this.job = page.getByRole('link', { name: 'Job' });
    this.organization = page.getByRole('link', { name: 'Organization' });
    // Header locator
    this.adminHeader = page.getByRole('heading', { name: 'Admin' });
    // Admin page elements
    this.searchBox = page.getByPlaceholder('Search');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.userRoleDropdown = page.getByLabel('User Role');
    this.statusDropdown = page.getByLabel('Status');
    this.usernameInput = page.getByLabel('Username');
    this.userTable = page.getByRole('table');
  }
}
