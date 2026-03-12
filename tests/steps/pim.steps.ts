import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/fixtures';
import { FakerDataUtil } from '../../src/utils/fakerData_util';
import { saveEmployeeByType, getLastEmployeeByType } from '../../src/utils/users-util';
const { Given, When, Then } = createBdd(test);

//let employeeContext;

// Temp holder for the employee being created
let currentEmployee: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    employeeId?: string;
    userType?: 'clientadmin' | 'ess';
} = {};


When('user navigates to {string} module', async ({ dashboardPage, pimPage, myInfoPage }, moduleName: string) => {
    switch (moduleName) {
        case 'PIM':
            await dashboardPage.pim.click();
            await expect(pimPage.pimHeader).toBeVisible();
            break;
        case 'MyInfo':
            await dashboardPage.myInfo.click();
            break;
        //await expect(myInfoPage) //ADD THE LOCATORS FIRST
        default:
            throw new Error(`Module "${moduleName}" is not defined in the switch case`);

    }

});

When('user clicks on {string}', async ({ pimPage }, buttonName: string) => {
    await pimPage.addEmployee.click();

});

When('user enters employee details {string} {string} {string}', async ({ pimPage }, firstName: string, middleName: string, lastName: string) => {
    await expect(pimPage.firstName).toBeVisible();
    await pimPage.firstName.fill(firstName);
    await pimPage.middleName.fill(middleName);
    await pimPage.lastName.fill(lastName);


    // Cache for saving/validation
    currentEmployee.firstName = firstName;
    currentEmployee.middleName = middleName;
    currentEmployee.lastName = lastName;

});

When('user generate EmployeeId for  the employee', async ({ pimPage }) => {
    const empId = FakerDataUtil.getEmployeeId();
    await pimPage.employeeId.fill(empId);
    currentEmployee.employeeId = empId;

});

When('user saves the details for {string}', async ({ pimPage, dashboardPage }, usertype: string) => {

    //When('user saves the details for {string}', async ({ pimPage, dashboardPage }, userType: 'clientadmin' | 'ess') => {
    await pimPage.addEmployeeSaveButton.click();
    // await expect(pimPage.firstName).toBeHidden(); //Element is still in DOM but not visible
    // await expect(pimPage.firstName).not.toBeVisible(); //element cannot be seen on UI
    //await pimPage.firstName.waitFor({ state: 'detached' }); //Element is completely removed from DOM, but it is not an assertion

    //await expect(pimPage.firstName).toBeDetached(); //This will not work
    // Infer userType from the Scenario Outline title:
    // e.g., "Create employee as clientadmin and validate in PIM Employee List"
    await dashboardPage.saveUserAndWait("Successfully Saved");
    // await pimPage.employeeList.click();

    //  const title = (testInfo.title || '').toLowerCase();
    // let userType: 'clientadmin' | 'ess' | undefined;


    // if (title.includes('create employee as clientadmin')) userType = 'clientadmin';
    // else if (title.includes('create employee as ess')) userType = 'ess';

    // //in the below check $testinfo part in below as it not separately detecting
    // if (!userType) {
    //     throw new Error
    //         (
    //             `Could not infer userType from scenario title: "${testInfo.title}". ` +
    //             `Make sure your Scenario Outline starts with "Create employee as <userType>" ...`
    //         );

    // }

    currentEmployee.userType = (usertype.toLowerCase() as 'clientadmin' | 'ess');


    // Validate data before persisting
    if (!currentEmployee.firstName || !currentEmployee.lastName || !currentEmployee.employeeId) {
        throw new Error('Missing employee data before saving to users.json');
    }

    // Persist to users.json in the correct array
    saveEmployeeByType(currentEmployee.userType, {
        firstName: currentEmployee.firstName,
        middleName: currentEmployee.middleName || '',
        lastName: currentEmployee.lastName,
        employeeId: currentEmployee.employeeId
    });
    await pimPage.employeeList.click();


});

// When('user clicks on Employee List', async ({pimPage}) => {
//   pimPage.employeeList.click();


// });

Then('employee {string} {string} should appear in Employee List with the matching employee id', async ({ pimPage }, firstName: string, lastName: string) => {
    //Navuigating to employee list
    await pimPage.employeeList.click();
    //await expect(pimPage.employeeTable).toBeVisible();
    await pimPage.employeeTableBodyRows.last().waitFor({ state: 'visible', timeout: 10_000 });

    if (!currentEmployee.userType) {
        // If userType not set for some reason, derive again from the composed name (fallback)
        // But generally, userType is set in save step above.
        throw new Error('userType not available in memory; ensure save step executed successfully');
    }

    const savedEmp = getLastEmployeeByType(currentEmployee.userType);
    if (!savedEmp) {
        throw new Error(`No saved employee found in users.json for type: ${currentEmployee.userType}`);
    }


    const expectedFullName = `${firstName} ${lastName}`;
    const expectedId = savedEmp.employeeId;

    //Handle pagination
    let found = false;

    while (!found) {
        const count = await pimPage.employeeTableBodyRows.count();

        for (let i = 0; i < count; i++) {
            const idCell = await pimPage.employeeTableBodyRows.locator('.oxd-table-cell').nth(1).innerText();
            const nameCell = await pimPage.employeeTableBodyRows.locator('.oxd-table-cell').nth(2).innerText();

            if (nameCell.trim() === expectedFullName && idCell.trim() === expectedId) {
                found = true;
                break;
            }

        }

        if (!found) {

            //Case 1 — “Next icon NOT VISIBLE”
            const nextVisible = await pimPage.paginationNext.isVisible().catch(() => false);
            if (!nextVisible) break; // no next control on this page

            //Case 2 — “Next icon VISIBLE but DISABLED”
            const nextEnabled = await pimPage.paginationNext.isEnabled().catch(() => false);
            if (!nextEnabled) break; // last page (disabled)

            await pimPage.paginationNext.click();

            // if (await pimPage.paginationNext.isEnabled()) {
            //     await pimPage.paginationNext.click();
            // }
            // else
            //     break;
        }
    }


    expect(found, `Employee ${firstName} ${lastName} with ID ${savedEmp} not found`).toBeTruthy();



});

