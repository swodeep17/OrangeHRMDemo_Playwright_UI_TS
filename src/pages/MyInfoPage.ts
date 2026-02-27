import { createBdd } from 'playwright-bdd';
import { test} from '../../src/fixtures/fixtures';
const { Given, When, Then } = createBdd(test);

import { Locator, Page } from '@playwright/test';

export class MyInfoPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}