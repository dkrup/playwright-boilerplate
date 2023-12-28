import {PageBaseClass} from './PageBaseClass';

export class LoginPage extends PageBaseClass {
    // Login Page Selectors
    private WEBSITE_LINK = 'https://www.saucedemo.com/';
    private loginFormSelector = '.form_group';
    private usernameInputSelector = '#user-name';
    private passwordInputSelector = '#password';
    private loginButtonSelector = '[data-test="login-button"]';
    private errorMessageSelector = '[data-test="error"]';
    private inventoryPageSelector = '#inventory_container';

    // Login Page Elements
    private loginFormElem = () => this.page.locator(this.loginFormSelector).first();
    private usernameInputElem = () => this.page.locator(this.usernameInputSelector).first();
    private passwordInputElem = () => this.page.locator(this.passwordInputSelector).first();
    private loginBtnElem = () => this.page.locator(this.loginButtonSelector).first();
    private errorMessageElem = () => this.page.locator(this.errorMessageSelector).first();
    private inventoryPageElem = () => this.page.locator(this.inventoryPageSelector).first();

    // Login Page Methods
    async waitForLoginFormVisible() {
        await this.loginFormElem().waitFor({state: 'visible'});
    }

    async waitForUsernameInputVisible() {
        await this.usernameInputElem().waitFor({state: 'visible'});
    }

    async waitForPasswordInputVisible() {
        await this.passwordInputElem().waitFor({state: 'visible'});
    }

    async openWebsite() {
        await this.openUrl(this.WEBSITE_LINK);
    }

    async fillUsernameInput(userName: string) {
        await this.usernameInputElem().fill(userName);
    }

    async fillPasswordInput(password: string) {
        await this.passwordInputElem().fill(password);
    }

    async clickLoginBtn() {
        await this.loginBtnElem().click();
    }

    async isErrorMessageShown() {
        return await this.errorMessageElem().isVisible();
    }

    getErrorMessageText = async () => await this.errorMessageElem().textContent();

    async isInventoryPageOpened() {
        return await this.inventoryPageElem().isVisible();
    }
}
