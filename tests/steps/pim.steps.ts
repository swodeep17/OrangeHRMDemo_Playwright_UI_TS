import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/fixtures';
 import { FakerDataUtil } from '../../src/utils/fakerData_util';
const { Given, When, Then } = createBdd(test);

let employeeContext;

When('user navigates to {string} module', async ({dashboardPage, pimPage, myInfoPage}, moduleName: string) => {
switch(moduleName){
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

When('user clicks on {string}', async ({pimPage}, buttonName: string) => {
    await pimPage.addEmployee.click();

});

When('user enters employee details {string} {string} {string}', async ({pimPage}, firstName: string, middleName: string, lastName: string) => {
    await pimPage.firstName.fill(firstName);
    await pimPage.middleName.fill(middleName);
    await pimPage.lastName.fill(lastName);
});

When('user generate EmployeeId for  the employee', async ({pimPage}) => {
    employeeContext = FakerDataUtil.getEmployeeId();
    await pimPage.employeeId.fill(employeeContext);

});

When('user saves the details', async ({pimPage}) => {
    await pimPage.addEmployeeSaveButton.click();
    await expect(pimPage.firstName).toBeHidden(); //Element is still in DOM but not visible
    await expect(pimPage.firstName).not.toBeVisible(); //element cannot be seen on UI
    //await pimPage.firstName.waitFor({ state: 'detached' }); //Element is completely removed from DOM, but it is not an assertion

    //await expect(pimPage.firstName).toBeDetached(); //This will not work
    

});

Then('employee {string}{string} should appear in Employee List with the matching employee id', async ({}, firstName: string, lastName: string) => {
  
});

