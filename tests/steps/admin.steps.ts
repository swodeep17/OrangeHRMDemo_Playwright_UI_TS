import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/fixtures';
import { FakerDataUtil } from '../../src/utils/fakerData_util';
import { getLastEmployeeByType, saveAdminCredentials } from "../../src/utils/users-util";
const { Given, When, Then } = createBdd(test);

//Commenting this step as we need to click on add user button for every new entry in datatable
// When('user clicks on Add user button', async ({ adminPage }) => {
//     await adminPage.addButton.click();
//     await expect(adminPage.userConfirmPassword).toBeVisible();

// });

When('user map roles for existing employee and create credentials', async ({ adminPage }, dataTable) => {

    await adminPage.addButton.click();
    await expect(adminPage.userConfirmPassword).toBeVisible();

    const rows = dataTable.hashes();

    for (const row of rows) {

        const role = row.role.trim();  // "clientadmin" or "ess"
        const username = row.username.trim();
        const password = row.password.trim();
        const status = row.status.trim();


        //Get Employee from JSON
        const employee = getLastEmployeeByType(role);
        if (!employee) {
            throw new Error(`No employee found for role '${role}'`);
        }

        const fullname = `${employee.firstName} ${employee.lastName}`;

        //Fill the Admin UI details
        await adminPage.selectRole(role);
        await adminPage.selectStatus(status);

        await adminPage.searchAndSelectEmployee(fullname);

        await adminPage.usernameInput.fill(username);
        await adminPage.userPassword.fill(password);
        await adminPage.userConfirmPassword.fill(password);

        await adminPage.saveUserAndWait("Successfully Saved");
        saveAdminCredentials(fullname, username, password);
    }

});