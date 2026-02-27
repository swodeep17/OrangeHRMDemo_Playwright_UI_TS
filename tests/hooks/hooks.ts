//import { test } from '../../src/fixtures/fixtures';

// test.beforeEach(async ({ loginPage }, testInfo) => {
//   let username = 'superadmin', password = 'superadminPass';
//   if (testInfo.title.includes('@role.clientAdmin')) {
//     username = 'alice.admin'; password = 'clientAdminPass';
//   } else if (testInfo.title.includes('@role.ess')) {
//     username = 'bob.employee'; password = 'essPass';
//   }
//   await loginPage.validLogin(username, password);
// });

// test.afterEach(async ({ dashboardPage, page }) => {
//   //await dashboardPage.logout();
//   await page.close();
// });