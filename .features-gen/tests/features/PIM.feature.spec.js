// Generated from: tests\features\PIM.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('Employee creation and validation in PIM', () => {

  test.beforeEach('Background', async ({ Given, loginPage }, testInfo) => { if (testInfo.error) return;
    await Given('user login as "superadmin"', null, { loginPage }); 
  });
  
  test.describe('Create employee as <userType> and validate in PIM Employee List', () => {

    test('Create employee as clientadmin and validate in PIM Employee List', { tag: ['@createEmployee'] }, async ({ When, Then, And, dashboardPage, myInfoPage, pimPage }) => { 
      await When('user navigates to "PIM" module', null, { dashboardPage, myInfoPage, pimPage }); 
      await And('user clicks on "Add Employee"', null, { pimPage }); 
      await And('user enters employee details "John" "Ak" "Carter"', null, { pimPage }); 
      await And('user generate EmployeeId for  the employee', null, { pimPage }); 
      await And('user saves the details', null, { pimPage }); 
      await Then('employee "John" "Carter" should appear in Employee List with the matching employee id', null, { pimPage }); 
    });

    test('Create employee as ess and validate in PIM Employee List', { tag: ['@createEmployee'] }, async ({ When, Then, And, dashboardPage, myInfoPage, pimPage }) => { 
      await When('user navigates to "PIM" module', null, { dashboardPage, myInfoPage, pimPage }); 
      await And('user clicks on "Add Employee"', null, { pimPage }); 
      await And('user enters employee details "Rahul" "Kk" "Sharma"', null, { pimPage }); 
      await And('user generate EmployeeId for  the employee', null, { pimPage }); 
      await And('user saves the details', null, { pimPage }); 
      await Then('employee "Rahul" "Sharma" should appear in Employee List with the matching employee id', null, { pimPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\PIM.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":35,"tags":["@createEmployee"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When user navigates to \"PIM\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"PIM\"","children":[{"start":19,"value":"PIM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And user clicks on \"Add Employee\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Add Employee\"","children":[{"start":16,"value":"Add Employee","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And user enters employee details \"John\" \"Ak\" \"Carter\"","stepMatchArguments":[{"group":{"start":29,"value":"\"John\"","children":[{"start":30,"value":"John","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":36,"value":"\"Ak\"","children":[{"start":37,"value":"Ak","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":41,"value":"\"Carter\"","children":[{"start":42,"value":"Carter","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And user generate EmployeeId for  the employee","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And user saves the details","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then employee \"John\" \"Carter\" should appear in Employee List with the matching employee id","stepMatchArguments":[{"group":{"start":9,"value":"\"John\"","children":[{"start":10,"value":"John","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":16,"value":"\"Carter\"","children":[{"start":17,"value":"Carter","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":36,"tags":["@createEmployee"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When user navigates to \"PIM\" module","stepMatchArguments":[{"group":{"start":18,"value":"\"PIM\"","children":[{"start":19,"value":"PIM","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And user clicks on \"Add Employee\"","stepMatchArguments":[{"group":{"start":15,"value":"\"Add Employee\"","children":[{"start":16,"value":"Add Employee","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And user enters employee details \"Rahul\" \"Kk\" \"Sharma\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Rahul\"","children":[{"start":30,"value":"Rahul","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"\"Kk\"","children":[{"start":38,"value":"Kk","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":42,"value":"\"Sharma\"","children":[{"start":43,"value":"Sharma","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And user generate EmployeeId for  the employee","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And user saves the details","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then employee \"Rahul\" \"Sharma\" should appear in Employee List with the matching employee id","stepMatchArguments":[{"group":{"start":9,"value":"\"Rahul\"","children":[{"start":10,"value":"Rahul","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":17,"value":"\"Sharma\"","children":[{"start":18,"value":"Sharma","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end