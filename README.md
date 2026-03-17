# OrangeHRM Playwright BDD Automation Framework
> End-to-end UI automation for OrangeHRM using **Playwright + playwright-bdd + TypeScript**.  
> BDD Gherkin scenarios, custom fixtures for page object injection, JSON-driven data management, and Allure reporting.

## 🎯 Target Application
**OrangeHRM Open Source Demo v5.8**  
🌐 https://opensource-demo.orangehrmlive.com

**************************************************************************************************************************************
## 📁 Project Structure
```
OrangeHRM_Playwright_BDD_TS_VS/
│
├── src/
│   ├── fixtures/
│   │   └── fixtures.ts                # Custom test extension (page object DI)
│   ├── pages/
│   │   ├── LoginPage.ts               # Login locators + validLogin()
│   │   ├── DashboardPage.ts           # Sidebar, toast, save flow helpers
│   │   ├── AdminPage.ts               # Role mapping, dropdowns, autocomplete
│   │   ├── PIMPage.ts                 # Employee list, add employee, pagination
│   │   └── MyInfoPage.ts              # Skeleton (pending implementation)
│   └── utils/
│       ├── users-util.ts              # Read/write users.json
│       ├── fakerData_util.ts          # Dynamic test data generation
│       ├── UI_util.ts                 # Scroll, mouse/keyboard helpers
│       ├── locator_util.ts            # Element interaction utilities
│       ├── excel_util.ts              # Excel read/write via ExcelJS
│       └── download_upload_util.ts    # File download/upload helpers
│
├── tests/
│   ├── features/
│   │   ├── Login.feature              # @smoke @regression @logintest
│   │   ├── Dashboard.feature          # @dashboard
│   │   ├── PIM.feature                # @createEmp @pimUI
│   │   ├── Admin.feature              # @employeeRoleMapping
│   │   └── MyInfo.feature             # Pending
│   ├── steps/
│   │   ├── login.steps.ts
│   │   ├── dashboard.steps.ts
│   │   ├── pim.steps.ts
│   │   ├── admin.steps.ts
│   │   └── myinfo.step.ts
│   ├── hooks/
│   │   └── hooks.ts
│   └── support/
│       └── world.ts
│
├── test-data/
│   └── users.json
│
├── .features-gen/                     # Auto-generated (do not edit)
├── playwright.config.ts
├── playwright-bdd.config.ts
├── tsconfig.json
├── package.json
└── PLAYWRIGHT_BDD_NOTES.md
```


**************************************************************************************************************************************

## 🏗️ Architecture

### Layer Responsibilities

| Layer                | Files                                               | Responsibility                                                                      |
|----------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------|
| **Fixtures**         | `src/fixtures/fixtures.ts`                          | Extends `base.extend()` — injects page objects into every step via destructuring    |
| **Page Objects**     | `src/pages/*.ts`                                    | Locators + reusable async methods. No test logic — pure UI interaction              |
| **Step Definitions** | `tests/steps/*.ts`                                  | Maps Gherkin to page object calls. Manages `currentEmployee` state and `users.json` |
| **Feature Files**    | `tests/features/*.feature`                          | Business-readable Gherkin. Tagged with `@smoke`, `@regression`, `@createEmp` etc.   |
| **Utils**            | `src/utils/*.ts`                                    | Faker data generation, JSON persistence, Excel, file operations                     |
| **Config**           | `playwright-bdd.config.ts` + `playwright.config.ts` | BDD glue + global Playwright settings                                               |



## 👤 User Creation and Role Management Flow

This is the most architecturally significant part of the project — it mirrors how a real HR admin sets up users in OrangeHRM.

### Employee Types

| Type          | JSON Key                | Description                                           |
|---------------|-------------------------|--------------------------------------------------------|
| `superadmin`  | `users.superadmin`      | Hard-coded demo admin — `Admin / admin123`             |
| `clientadmin` | `users.clientadmins[0]` | PIM employee promoted to Admin role                    |
| `ess`         | `users.essUsers[0]`     | PIM employee assigned ESS (Employee Self Service) role |

**************************************************************************************************************************************
### Step-by-Step Flow

#### Step 1 — Create Employees in PIM (`@createEmp`)
- Scenario Outline runs **twice** — once for `clientadmin`, once for `ess`
- `FakerDataUtil.getEmployeeId()` generates a unique `EMP-XXXXXX` ID at runtime
- Employee details filled into the Add Employee form
- On save → `saveEmployeeByType()` writes to `users.json` at `[0]` position (replace, not push — prevents duplicate accumulation)

#### Step 2 — Validate in Employee List (same scenario)
- Reads saved `employeeId` from `users.json` as ground truth
- Pagination-aware loop: reads `nth(1)=ID`, `nth(2)=First(&Middle)Name` per row
- `waitForTableToLoad()` called **after** `paginationNext.click()` — trace confirmed calling it before caused page 2 to be skipped

#### Step 3 — Assign Roles and Credentials in Admin (`@employeeRoleMapping`)
- DataTable: `role | status | employee Name | username | password`
- For each row: Add button → User Role dropdown → Status → employee autocomplete → fill credentials
- `saveAdminCredentials()` finds the employee in `users.json` by `firstName+lastName` and appends `adminCredentials: { username, password }`

#### Step 4 — Login as clientadmin or ess
- `Given user login as "clientadmin"` reads `users.json` → `clientadmins[0].adminCredentials`
- Zero hardcoded credentials in step code

**************************************************************************************************************************************
### users.json — State After Each Stage
----json
// Default (empty)
{ "clientadmins": [], "essUsers": [] }

// After @createEmp
{ "clientadmins": [{ "firstName": "Dipu", "middleName": "Ak",
                      "lastName": "Carter", "employeeId": "EMP-XXXXXX" }] }

// After @employeeRoleMapping
{ "clientadmins": [{ ...employee, 
                      "adminCredentials": { "username": "dipu17admin", "password": "Snow@110029" } }] }


**************************************************************************************************************************************

## ⚙️ Installation

### Clone and run (recommended)
---bash
git clone https://github.com/swodeep17/OrangeHRMDemo_Playwright_UI_TS.git
cd OrangeHRMDemo_Playwright_UI_TS
npm install
npx playwright install

### Fresh setup
---bash
npm init -y
npm install -D @playwright/test
npx playwright install
npm install playwright-bdd
npm install -D typescript ts-node @types/node
npm install -D @faker-js/faker
npm install -D allure-commandline allure-playwright allure-cucumberjs
npm install exceljs

**************************************************************************************************************************************

## 🚀 Running Tests

### Step 1 — Generate spec files (required before every run)
---bash
npx bddgen

Reads `.feature` files, validates step definitions, generates `.spec.ts` files into `.features-gen/`.

### Step 2 — Run
---bash
# All tests
npx bddgen && npx playwright test

# By tag
npx playwright test --grep "@logintest"
npx playwright test --grep "@createEmp"
npx playwright test --grep "@regression"
npx playwright test --grep "@smoke"
npx playwright test --grep "@employeeRoleMapping"

# Specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Headed (visible browser)
npx playwright test --headed --project=chromium

# Generate missing step stubs
npx bddgen --missing

## ⚡ Parallel Execution

Playwright runs scenarios in parallel by default — each scenario gets an isolated browser context.
# Control worker count
npx playwright test --workers=4
npx playwright test --workers=1   # sequential/debug

**************************************************************************************************************************************

## 📈 Reporting

### Playwright HTML Report (built-in)

Auto-generated at `playwright-report/index.html` after every run.
---bash
npx playwright show-report
npx playwright show-trace test-results/<scenario>/trace.zip

### Allure Report
---bash
npx playwright test --reporter=allure-playwright
allure serve allure-results


### Dual reporter (both in one run)

In `playwright.config.ts`:
reporter: [['html'], ['allure-playwright']],

**************************************************************************************************************************************

## 🔧 Custom Fixtures (Dependency Injection)

The project uses `base.extend<MyFixtures>()` — Playwright's recommended DI pattern for playwright-bdd:
```ts
// fixtures.ts
export const test = base.extend<MyFixtures>({
  loginPage:     async ({ page }, use) => { await use(new LoginPage(page)); },
  dashboardPage: async ({ page }, use) => { await use(new DashboardPage(page)); },
  adminPage:     async ({ page }, use) => { await use(new AdminPage(page)); },
  pimPage:       async ({ page }, use) => { await use(new PIMPage(page)); },
});

// Steps receive page objects via destructuring — no manual instantiation
When('user navigates to "PIM" module', async ({ dashboardPage, pimPage }) => {
  await dashboardPage.pim.click();
  await expect(pimPage.pimHeader).toBeVisible();
});
```

Each fixture is created fresh per scenario — complete isolation in parallel runs.

**************************************************************************************************************************************

## 🐛 Notable Framework Bugs Fixed

| Bug | Fix |
|--------------------------------------------------------------|---------------------------------------------------------------|
| `waitForTableToLoad()` called before pagination click        | Moved to **after** click — trace confirmed page 2 count was 0 |
| Loop variable `i` not used in row iteration                  | Changed to `.nth(i)` to scope cell reads to correct row       |
| `${savedEmp}` printed `[object Object]`                      | Fixed to `${savedEmp.employeeId}`                             |
| Column `nth(2)` matched against `firstName+lastName`         | Fixed to `firstName+middleName` (actual column content)       |
| `addButton.click()` outside DataTable loop                   | Moved inside loop — ESS row never had a form opened           |
| Circular import: `MyInfoPage.ts` imported from `fixtures.ts` | Removed all step/fixture imports from page objects            |
| ESS users accumulating via `.push()` on every run            | Changed to `[0]=` replacement for both types                  |

**************************************************************************************************************************************

## 👨‍💻 Author

**Swodeep Sahoo**  
QA Automation Engineer

📧 mailto:swodeep17@gmail.com
🔗 https://www.linkedin.com/in/swodeep-sahoo-110016/

**************************************************************************************************************************************

## 🛠️ Tech Stack

- **Playwright** v1.50+ with **playwright-bdd** v8.4.2
- **TypeScript** 5.8 | **Node.js** 18+
- **Cucumber Gherkin** (BDD) via playwright-bdd
- **Allure Reports** + Playwright HTML Reporter
- **@faker-js/faker** — dynamic data generation
- **ExcelJS** — Excel-based data utilities
