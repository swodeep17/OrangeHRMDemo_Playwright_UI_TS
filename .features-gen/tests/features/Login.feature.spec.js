// Generated from: tests\features\Login.feature
import { test } from "../../../src/fixtures/fixtures.ts";

test.describe('OrangeHRM Login', () => {

  test('Login as superadmin', { tag: ['@smoke'] }, async ({ Given, Then, loginPage, page }) => { 
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
  {"pwTestLine":6,"pickleLine":13,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given user login as \"superadmin\"","stepMatchArguments":[{"group":{"start":14,"value":"\"superadmin\"","children":[{"start":15,"value":"superadmin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then dashboard should be visible","stepMatchArguments":[]}]},
]; // bdd-data-end