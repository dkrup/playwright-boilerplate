import { loginPageTestData } from './testData/LoginPageTestData';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { LoginPageService } from '../services/LoginPageService';

import { chromium } from 'playwright';

const invalidUser = loginPageTestData.invalidUsername;
const invalidPass = loginPageTestData.invalidPassword;
const validUser = loginPageTestData.validUsername;
const validPass = loginPageTestData.validPassword;

let loginPage: LoginPage;
let loginPageService: LoginPageService;

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

test.describe(`Playwright's demo test`, () => {
    test(`Basic Playwright's test`, async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/active');
        await expect(page.locator('h1')).toHaveText(/todos/);
    });
});

test.describe.skip('Example of Parametrized test', () => {
    [
        { name: 'Alice', expected: 'Hello, Alice!' },
        { name: 'Bob', expected: 'Hello, Bob!' },
        { name: 'Charlie', expected: 'Hello, Charlie!' },
    ].forEach(({ name, expected }) => {
        test(`Parametrized test testing with ${name}`, async ({ page }) => {
            await page.goto(`https://example.com/greet?name=${name}`);
            await expect(page.getByRole('heading')).toHaveText(expected);
        });
    });
});
