import {LoginPage} from '../pageObjects/LoginPage';

export class LoginPageService {
    loginPage: LoginPage;

    constructor(loginPage: LoginPage) {
        this.loginPage = loginPage;
    }

    async openLoginPage() {
        await this.loginPage.openWebsite();
        await this.loginPage.waitForLoginFormVisible();
        await this.loginPage.waitForUsernameInputVisible();
        await this.loginPage.waitForPasswordInputVisible();
    }

    async fillLoginPageForm(userName: string, password: string) {
        await this.loginPage.fillUsernameInput(userName);
        await this.loginPage.fillPasswordInput(password);
        await this.loginPage.clickLoginBtn();
    };

    async isLoginSuccessful() {
        return await this.loginPage.isInventoryPageOpened();
    };
}
