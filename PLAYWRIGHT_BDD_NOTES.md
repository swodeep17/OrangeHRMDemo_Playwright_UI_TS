1. Initialize Project**

npm init -y


2. Install Playwright**

npm i -D @playwright/test


Install browsers:

npx playwright install


3. Install Playwright‑BDD**

npm i playwright-bdd


4. Install Allure Reporting (optional)**

npm i -D allure-commandline
npm i -D allure-playwright
npm i -D @types/allure-js-commons


5. Install Utility Packages**

npm i -D typescript ts-node
npm i -D @faker-js/faker
npm i exceljs


Initialize TypeScript:

npx tsc --init //You can avoid this if you already if the tsconfig.json in the project while cloning this project


6. Generate Test Files From Feature Files**

This is the MOST IMPORTANT playwright‑bdd command:
npx bddgen

This does:
Reads `.feature` files  
Checks step definitions  
Generates `.spec.ts` files in `.features-gen/` internal folder  
Makes Gherkin runnable by Playwright test runner


7. Generate SAMPLE EMPTY STEPS for Missing Steps**

When feature steps are missing, use:

npx bddgen --missing

This will produce:
Auto‑generated skeleton steps
Helps you write pending step definitions for any new feature
Super helpful when building new modules

8. Run Tests (with grep by tag)**

Example:
npx playwright test --grep "@login"

With project:
npx playwright test --grep "@login" --project=chromium

Headed:
npx playwright test --grep "@login" --project=chromium --headed


9. Run BDD Tests (Full Flow)**

The recommended full command:
npx bddgen && npx playwright test

With tags:
npx bddgen --tags "@login" && npx playwright test


10. Add NPM Scripts to Package.json**

"scripts": {
  "bdd:login": "bddgen && playwright test --grep \"@login\" --project=chromium",
  "bdd:all": "bddgen && playwright test"
}


Run using:
npm run bdd:login

***

11. Clone the repo to avoid install of all packages again


git clone <repo-url>
cd project

npm install

12. I have added Playwright MCP and Playwright CLI below are commands I used
playwright mcp---- npx playwright init-agents --loop=vscode

playwright cli---- npm install -g @playwright/cli@latest
to add to dependency level other than glocal level --- npm install @playwright/cli
After add skills --- playwright-cli install --skills
This will create .claude folder with skills folder