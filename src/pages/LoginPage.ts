import{Locator,Page} from '@playwright/test';

export class LoginPage
{

    page:Page;
    username:Locator;
    password:Locator;
    loginButton:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.username = page.getByRole('textbox',{name:"Username"});
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.locator('button:has-text("Login")');

    }

    async goto()
    {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    

    async validLogin(userName:string,passWord:string)
    {
        await this.goto();
        await this.username.fill(userName);
        await this.password.fill(passWord);
        await this.loginButton.click();
    }
}