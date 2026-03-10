// Generated from: tests\features\Admin.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('User and role management in Admin module', () => {

  test.beforeEach('Background', async ({ Given, loginPage }, testInfo) => { if (testInfo.error) return;
    await Given('user login as "superadmin"', null, { loginPage }); 
  });
  
  test('Create credentials for employees and assign roles', { tag: ['@employeeRoleMapping'] }, async ({ When, And, adminPage, dashboardPage, myInfoPage, pimPage }) => { 
    await When('user navigates to "Admin" module', null, { dashboardPage, myInfoPage, pimPage }); 
    await And('user map roles for existing employee and create credentials', {"dataTable":{"rows":[{"cells":[{"value":"role"},{"value":"status"},{"value":"username"},{"value":"password"}]},{"cells":[{"value":"clientadmin"},{"value":"Enabled"},{"value":"dipu17admin"},{"value":"Snow@110029"}]},{"cells":[{"value":"ess"},{"value":"Enabled"},{"value":"sahoo17ess"},{"value":"Password@123"}]}]}}, { adminPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Admin.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":7,"tags":["@employeeRoleMapping"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user navigates to \"Admin\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"Admin\"","children":[{"start":19,"value":"Admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user map roles for existing employee and create credentials","stepMatchArguments":[]}]},
]; // bdd-data-end