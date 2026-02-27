import { Page, Locator,expect  } from '@playwright/test';

export class DashboardPage {
  page: Page;

  //Menu side panel
  search: Locator;
  admin: Locator;
  pim: Locator;
  dashboard: Locator;
  myInfo: Locator;
  sideMenu: Locator;
  menuList: Locator;

  //Header
  profileAvatar: Locator;
  logout: Locator;
  dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Side menu locators (role/text based)
    this.search = page.getByPlaceholder('Search');
    this.sideMenu = page.getByRole('navigation').first();
    this.menuList = page.getByRole('list');
    this.admin = page.getByRole('link', { name: 'Admin' });
    this.pim = page.getByRole('link', { name: 'PIM' });
    this.dashboard = page.getByRole('link', { name: 'Dashboard' });
    this.myInfo = page.getByRole('link', { name: 'My Info' });
    // Header locators
    this.profileAvatar = page.locator('img.oxd-userdropdown-img'); // No role/label, keep as is
    this.logout = page.getByRole('menuitem', { name: 'Logout' });
    this.dashboardTitle = page.getByRole('heading', { name: /dashboard/i });

  }

  async userLogout()
    {
      await this.profileAvatar.click();
      await expect(this.logout).toBeVisible();
      //await this.logout.waitFor({state:"visible"});

      await this.logout.click();
    }
}