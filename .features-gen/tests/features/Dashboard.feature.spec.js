// Generated from: tests\features\Dashboard.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('Dashboard widgets and navigation by role', () => {

  test.beforeEach('Background', async ({ Given, loginPage }, testInfo) => { if (testInfo.error) return;
    await Given('user login as "superadmin"', null, { loginPage }); 
  });
  
  test('Validate dashboard headers', { tag: ['@dashboard'] }, async ({ Then, And, dashboardPage }) => { 
    await Then('validate page title "Dashboard" is displayed', null, { dashboardPage }); 
    await Then('validate profile avatar icon', null, { dashboardPage }); 
    await And('user should be able to logout', null, { dashboardPage }); 
  });

  test('Validate sidemenu and menulist items like admin, pim, myinfo are present', { tag: ['@dashboard'] }, async ({ Then, And, dashboardPage }) => { 
    await Then('validate side menu is displayed', null, { dashboardPage }); 
    await And('admin option is showing in menulist', null, { dashboardPage }); 
    await And('pim option is showing in menulist', null, { dashboardPage }); 
    await And('myinfo option is showing in menulist', null, { dashboardPage }); 
    await And('user should be able to logout', null, { dashboardPage }); 
  });

  test('Validate user is navigate across modules from side menulist', { tag: ['@dashboard', '@test2202'] }, async ({ And, adminPage, dashboardPage }) => { 
    await And('user navigates to Admin module', null, { adminPage, dashboardPage }); 
    await And('user navigate to dashboard module from side menulist', null, { dashboardPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Dashboard.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":18,"tags":["@dashboard"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then validate page title \"Dashboard\" is displayed","stepMatchArguments":[{"group":{"start":20,"value":"\"Dashboard\"","children":[{"start":21,"value":"Dashboard","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then validate profile avatar icon","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And user should be able to logout","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":23,"tags":["@dashboard"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then validate side menu is displayed","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And admin option is showing in menulist","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And pim option is showing in menulist","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And myinfo option is showing in menulist","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And user should be able to logout","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":31,"tags":["@dashboard","@test2202"],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","isBg":true,"stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And user navigates to Admin module","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And user navigate to dashboard module from side menulist","stepMatchArguments":[]}]},
]; // bdd-data-end