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

  // Employee List table (dynamic)
  employeeTable: Locator;
  employeeTableHeaderCells: Locator; // all header cells (may include a blank first cell)
  employeeTableBodyRows: Locator;    // each row card in the body
  pagination: Locator;
  paginationNext: Locator;
  paginationPrev: Locator;

  spinner: Locator;



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
    //Employee list table
    this.employeeTable = page.locator('.oxd-table');
    this.employeeTableHeaderCells = page.locator('.oxd-table-header .oxd-table-header-cell');// Each item (row) is usually a "card" with inner .oxd-table-row > .oxd-table-cell
    this.employeeTableBodyRows = page.locator('.oxd-table-body .oxd-table-card');
    //pagination
    this.pagination = page.locator('ul[class="oxd-pagination__ul"]');
    //this.pagination  = page.getByRole('navigation', { name: 'Pagination' }); //this will also work
    this.paginationNext = this.pagination.locator('i[class="oxd-icon bi-chevron-right"]');
    // this.pagination.getByRole('button', { name: /next/i }).or(
    // this.pagination.locator('.oxd-pagination-page-item--next button')
    // ); //using or to make the locator resilient to multiple possible DOM patterns
    this.paginationPrev = this.pagination.locator('i[class="oxd-icon bi-chevron-left"]');
    // this.pagination.getByRole('button', { name: /prev/i }).or(
    //   this.pagination.locator('.oxd-pagination-page-item--previous button')
    // );

    // Spinner (overlay/container)
    this.spinner = page.locator('.oxd-loading-spinner, .oxd-loading-spinner-container');

  }
  async waitForSpinnerToDisappear(timeout = 15000) {
    // Spinner may not appear every time; ignore if not visible within timeout
    await this.spinner.first().waitFor({ state: 'hidden', timeout }).catch(() => { });
  }

  async waitForTableToLoad() {
    await this.waitForSpinnerToDisappear();

    // rows are re-rendered every page; ensure at least one is visible
    await this.employeeTableBodyRows.first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });

  }
}
