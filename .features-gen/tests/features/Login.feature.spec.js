// Generated from: tests\features\Login.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('OrangeHRM Login', () => {

  test('Login as superadmin', async ({ Given, Then, loginPage, page }) => { 
    await Given('user login as "superadmin"', null, { loginPage }); 
    await Then('dashboard should be visible', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\Login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":12,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then dashboard should be visible","stepMatchArguments":[]}]},
]; // bdd-data-end