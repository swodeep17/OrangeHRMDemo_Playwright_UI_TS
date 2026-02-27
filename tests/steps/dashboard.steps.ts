import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/fixtures'; // <-- use your custom test //new change commented


const { Given, When, Then } = createBdd(test);

Then('validate page title {string} is displayed', async ({dashboardPage}, expectedTitle: string) => {
  await expect(dashboardPage.dashboardTitle).toHaveText(expectedTitle);
});

Then('validate profile avatar icon', async ({dashboardPage}) => {
  await expect(dashboardPage.profileAvatar).toBeVisible();
});

Then('user should be able to logout', async ({dashboardPage}) => {
  await dashboardPage.userLogout();
});

Then('validate side menu is displayed', async ({dashboardPage}) => {
  await expect(dashboardPage.sideMenu).toBeVisible();
});

Then('admin option is showing in menulist', async ({dashboardPage}) => {
  await expect(dashboardPage.admin).toBeVisible();
});

Then('pim option is showing in menulist', async ({dashboardPage}) => {
  await expect(dashboardPage.pim).toBeVisible();
});

Then('myinfo option is showing in menulist', async ({dashboardPage}) => {
  await expect(dashboardPage.myInfo).toBeVisible();
});

Given('user navigates to Admin module', async ({dashboardPage,adminPage}) => {
 await dashboardPage.admin.click();
 await expect.soft(adminPage.adminHeader).toContainText('Admin');
 //await expect.soft(adminPage.adminHeader).toHaveText(/Admin/i); //i in this for ignoring case sensetive means admin, Admin, aDmin are are equal
 await expect(adminPage.userTable).toBeVisible();
});

Given('user navigate to dashboard module from side menulist', async ({dashboardPage}) => {
  await dashboardPage.dashboard.click();
  //expect(dashboardPage.dashboardTitle).toHaveText('Dashboard'); //hard assertions
  await expect.soft(dashboardPage.dashboardTitle).toHaveText('Dashboard'); //soft assertions
  
});
