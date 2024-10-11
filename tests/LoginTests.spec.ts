import { test } from '@playwright/test';
import { password, username } from 'data/TestData';
import { LoginPage } from "../pages/LoginPage";
import { TodoListPage } from "../pages/TodoListPage";
import { generateRandomString } from "../utils/CommonUtils";

test.describe('Check login page', async () => {

    test('Assert login with empty username and empty password', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.fillUsernameInput('');
        await loginPage.fillPasswordInput('');
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessage();
    });

    test('Assert login with incorrect username and incorrect password', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.fillUsernameInput(generateRandomString());
        await loginPage.fillPasswordInput(generateRandomString());
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessage();
    });

    test('Assert login with incorrect username and empty password', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.fillUsernameInput(generateRandomString());
        await loginPage.fillPasswordInput('');
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessage();
    });

    test('Assert login with incorrect username with special symbols and incorrect password with special symbols', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.fillUsernameInput(generateRandomString(10, true));
        await loginPage.fillPasswordInput(generateRandomString(10, true));
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessage();
    });

    test('Assert user logged in with correct credentials', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.fillUsernameInput(username);
        await loginPage.fillPasswordInput(password);
        await loginPage.clickLoginButton();
        const landingPage = await TodoListPage.create(page);
        await landingPage.assertAddTodoButton();
    });
});
