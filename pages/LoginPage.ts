import { click, fillTextArea, waitForVisible } from "../utils/CommonActions";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    protected targetPath = '/';

    private usernameInput = '//input[@name="username"]';
    private passwordInput = '//input[@name="password"]';
    private loginButton = '//button[text()=" Login"]';

    private errorText = 'something went wrong, please try again later';
    private errorContainer = `//div[text()="${this.errorText}"]`;

    async assertUsernameInput() {
        await waitForVisible(this.page, this.usernameInput);
    }

    async assertPasswordInput() {
        await waitForVisible(this.page, this.passwordInput);
    }

    async assertLoginButton() {
        await waitForVisible(this.page, this.loginButton);
    }

    async assertErrorMessage() {
        await waitForVisible(this.page, this.errorContainer)
    }

    async clickLoginButton() {
        await click(this.page, this.loginButton);
    }

    async fillUsernameInput(text: string) {
        await fillTextArea(this.page, this.usernameInput, text);
    }

    async fillPasswordInput(text: string) {
        await fillTextArea(this.page, this.passwordInput, text);
    }

    async login(user: string, password: string) {
        await this.fillUsernameInput(user);
        await this.fillPasswordInput(password);
        await this.clickLoginButton();
        await this.page.locator('//button[text()="Add todo"]').isVisible();
    }
}
