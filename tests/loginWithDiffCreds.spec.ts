import {loginPageTestData} from './testData/LoginPageTestData';
import {test, expect} from '@playwright/test';
import {LoginPage} from '../pageObjects/LoginPage';
import {LoginPageService} from '../services/LoginPageService';

const {chromium} = require('playwright');

const invalidUser = loginPageTestData.invalidUsername;
const invalidPass = loginPageTestData.invalidPassword;
const validUser = loginPageTestData.validUsername;
const validPass = loginPageTestData.validPassword;
let loginPage;
let loginPageService;

test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    loginPageService = new LoginPageService(loginPage);
});

test.describe('Try to log in with invalid and valid credentials', () => {
    test('Should not login with invalid credentials', async () => {
        await loginPageService.openLoginPage();
        await loginPageService.fillLoginPageForm(invalidUser, invalidPass);

        expect(await loginPage.isErrorMessageShown()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toBe(loginPageTestData.errorMessageText);
    });

    test('Should login with valid credentials', async () => {
        await loginPageService.openLoginPage();
        await loginPageService.fillLoginPageForm(validUser, validPass);
        const isLoginSuccessful = await loginPageService.isLoginSuccessful();

        expect(isLoginSuccessful).toBe(true);
        expect(await loginPage.isErrorMessageShown()).toBe(false);
    });
});


