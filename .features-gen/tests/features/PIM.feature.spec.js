// Generated from: tests\features\PIM.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('Employee creation and validation in PIM', () => {

  test.beforeEach('Background', async ({ Given, loginPage }, testInfo) => { if (testInfo.error) return;
    await Given('user login as "superadmin"', null, { loginPage }); 
  });
  
  test.describe('Create employee as <userType> and validate in PIM Employee List', () => {

    test('Create employee as clientadmin and validate in PIM Employee List', { tag: ['@createEmp'] }, async ({ When, Then, And, dashboardPage, myInfoPage, pimPage }) => { 
      await When('user navigates to "PIM" module', null, { dashboardPage, myInfoPage, pimPage }); 
      await And('user clicks on "Add Employee"', null, { pimPage }); 
      await And('user enters employee details "Dipu" "Ak" "Carter"', null, { pimPage }); 
      await And('user generate EmployeeId for  the employee', null, { pimPage }); 
      await And('user saves the details for "clientadmin"', null, { dashboardPage, pimPage }); 
      await Then('employee "Dipu" "Ak" should appear in Employee List with the matching employee id', null, { pimPage }); 
    });

    test('Create employee as ess and validate in PIM Employee List', { tag: ['@createEmp'] }, async ({ When, Then, And, dashboardPage, myInfoPage, pimPage }) => { 
      await When('user navigates to "PIM" module', null, { dashboardPage, myInfoPage, pimPage }); 
      await And('user clicks on "Add Employee"', null, { pimPage }); 
      await And('user enters employee details "Sahoo" "Kk" "Sharma"', null, { pimPage }); 
      await And('user generate EmployeeId for  the employee', null, { pimPage }); 
      await And('user saves the details for "ess"', null, { dashboardPage, pimPage }); 
      await Then('employee "Sahoo" "Kk" should appear in Employee List with the matching employee id', null, { pimPage }); 
    });

  });

  test('Validate the webtable headers', { tag: ['@pimUI'] }, async ({ When, Then, And, dashboardPage, myInfoPage, pimPage }) => { 
    await When('user navigates to "PIM" module', null, { dashboardPage, myInfoPage, pimPage }); 
    await And('user clicks on "Employee List"', null, { pimPage }); 
    await Then('the webtable should have the following headers:', {"dataTable":{"rows":[{"cells":[{"value":"Id"},{"value":"First (& Middle) Name"},{"value":"Last Name"},{"value":"Job Title"},{"value":"Employment Status"},{"value":"Sub Unit"},{"value":"Supervisor"},{"value":"Actions"}]}]}}, { pimPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\PIM.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":20,"tags":["@createEmp"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user navigates to \"PIM\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"PIM\"","children":[{"start":19,"value":"PIM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user clicks on \"Add Employee\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Add Employee\"","children":[{"start":16,"value":"Add Employee","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user enters employee details \"Dipu\" \"Ak\" \"Carter\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Dipu\"","children":[{"start":30,"value":"Dipu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":36,"value":"\"Ak\"","children":[{"start":37,"value":"Ak","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":41,"value":"\"Carter\"","children":[{"start":42,"value":"Carter","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And user generate EmployeeId for  the employee","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And user saves the details for \"clientadmin\"","stepMatchArguments":[{"group":{"start":27,"value":"\"clientadmin\"","children":[{"start":28,"value":"clientadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then employee \"Dipu\" \"Ak\" should appear in Employee List with the matching employee id","stepMatchArguments":[{"group":{"start":9,"value":"\"Dipu\"","children":[{"start":10,"value":"Dipu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":16,"value":"\"Ak\"","children":[{"start":17,"value":"Ak","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":21,"tags":["@createEmp"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user navigates to \"PIM\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"PIM\"","children":[{"start":19,"value":"PIM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user clicks on \"Add Employee\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Add Employee\"","children":[{"start":16,"value":"Add Employee","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And user enters employee details \"Sahoo\" \"Kk\" \"Sharma\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Sahoo\"","children":[{"start":30,"value":"Sahoo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"\"Kk\"","children":[{"start":38,"value":"Kk","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"Sharma\"","children":[{"start":43,"value":"Sharma","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And user generate EmployeeId for  the employee","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And user saves the details for \"ess\"","stepMatchArguments":[{"group":{"start":27,"value":"\"ess\"","children":[{"start":28,"value":"ess","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then employee \"Sahoo\" \"Kk\" should appear in Employee List with the matching employee id","stepMatchArguments":[{"group":{"start":9,"value":"\"Sahoo\"","children":[{"start":10,"value":"Sahoo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":17,"value":"\"Kk\"","children":[{"start":18,"value":"Kk","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":32,"pickleLine":25,"tags":["@pimUI"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When user navigates to \"PIM\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"PIM\"","children":[{"start":19,"value":"PIM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And user clicks on \"Employee List\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Employee List\"","children":[{"start":16,"value":"Employee List","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the webtable should have the following headers:","stepMatchArguments":[]}]},
]; // bdd-data-end