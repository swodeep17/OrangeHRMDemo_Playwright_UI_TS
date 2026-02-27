import { Page, Locator } from '@playwright/test';

export class PIMPage {
  page: Page;

  // Side menu
  pim: Locator;
  addEmployee: Locator;
  employeeList: Locator;

  // Header
  pimHeader: Locator;

  // PIM page elements
  searchBox: Locator;
  searchButton: Locator;
  resetButton: Locator;
  employeeIdInput: Locator;
  employeeNameInput: Locator;
  addButton: Locator;

  //Add Employee elements
  firstName: Locator;
  middleName: Locator;
  lastName: Locator;
  employeeId: Locator;
  employeeImage: Locator;
  createLoginCredRadioButton: Locator;
  addEmployeeSaveButton: Locator;
  


  constructor(page: Page) {
    this.page = page;
    // Side menu locators (role/text based)
    this.pim = page.getByRole('link', { name: 'PIM' });
    this.addEmployee = page.getByRole('link', { name: 'Add Employee' });
    this.employeeList = page.getByRole('link', { name: 'Employee List' });
    // Header locator (text based)
    this.pimHeader = page.getByRole('heading', { name: 'PIM' });
    // PIM page elements
    this.searchBox = page.getByPlaceholder('Search');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.employeeIdInput = page.getByLabel('Employee Id');
    this.employeeNameInput = page.getByLabel('Employee Name');
    this.addButton = page.getByRole('button', { name: 'Add' });
    //Add Employee elements
    this.firstName = page.getByPlaceholder('First Name');
    this.middleName = page.getByPlaceholder('Middle Name');
    this.lastName = page.getByPlaceholder('Last Name', { exact: true });
    this.employeeId = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.employeeImage = page.locator('.employee-image');
    this.createLoginCredRadioButton = page.locator('span.oxd-switch-input--active');
    this.addEmployeeSaveButton = page.getByRole('button', { name: /Save/i });




  }
}
