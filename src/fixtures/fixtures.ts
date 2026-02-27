//import { test as base, createBdd } from 'playwright-bdd';//commenting and new change

import { test as base} from 'playwright-bdd';
import { expect,Page} from '@playwright/test';
//import {expect} from '@playwright/test'; //20-02
//import {Page} from '@playwright/test'; //20-02

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';
import { PIMPage } from '../pages/PIMPage';
import { MyInfoPage } from '../pages/MyInfoPage';

type MyFixtures = {
  //page: Page; //new change
  newPage : Page; //new change
  newBrowser : Page; //new change

  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  adminPage: AdminPage;
  pimPage: PIMPage;
  myInfoPage: MyInfoPage;
};

export const test = base.extend<MyFixtures>({

// page: async ({page,browser,context}, use) =>
// {
//   await  use(page);
// },

//new change
newPage: async ({page},use) =>
{
const newPage = await page.context().newPage();
await use(newPage);
await newPage.close();
},

//new chnage
newBrowser: async ({browser},use) =>
{
const context = await browser.newContext();
const newPage = await context.newPage();
await use(newPage);
await context.close();
},

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  }
});

export { expect };// from '@playwright/test';




