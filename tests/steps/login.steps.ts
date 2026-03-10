// steps/login.steps.ts
import { createBdd } from 'playwright-bdd'; //new chnage commented //19-02
import { test, expect } from '../../src/fixtures/fixtures'; // <-- use your custom test //new change commented
import { readUsers } from "../../src/utils/users-util";

const { Given, When, Then } = createBdd(test); //commenting for new change //19-02


// Step 1: open login page using your page object method
// Given('User on the login page', async ({ loginPage }) => {
//   await loginPage.goto(); // calls your LoginPage.goto()
// });

// Variant A: login with explicit credentials
// When(
//   'I login with username {string} and password {string}',
//   async ({  loginPage }, username: string, password: string) => {
//     await loginPage.validLogin(username, password); // calls your validLogin()
//   }
// );

// Unified login step
Given('user login as {string}', async ({ loginPage }, role: string) => {
  const users = readUsers();
  let creds;

  switch (role.toLowerCase()) {
    case "superadmin":
      creds = users.superadmin;
      break;

    case "clientadmin":
      if (!users.clientadmins.length) throw new Error("Client admin not created yet!");
      creds = users.clientadmins[0];
      break;

    case "ess":
      if (!users.essUsers.length) throw new Error("ESS users not created yet!");
      creds = users.essUsers[0]; // or pick dynamically
      break;

    default:
      throw new Error(`Unknown role: ${role}`);
  }

  await loginPage.goto();
  await loginPage.validLogin(creds.username, creds.password);
});

Then('dashboard should be visible', async ({ page }) => {
  await expect(page).toHaveURL(/dashboard/i);
});