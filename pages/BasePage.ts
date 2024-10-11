import { Frame, Page } from "@playwright/test";
import { env } from "data/TestData";
import { shortTimeout } from "../utils/CommonUtils";

export abstract class BasePage {

    protected page: Page;
    protected abstract targetPath: string;


    constructor(page: Page) {
        this.page = page;
    }

    static async create<T extends BasePage>(this: new (page: Page) => T, page: Page): Promise<T> {
        const pageObject = new this(page);
        await pageObject.init();
        return pageObject;
    }

    // Default init method that can be overridden by subclasses
    protected async init(): Promise<void> {
        await this.navigateIfNotOnPage(this.targetPath);
    }

    protected async navigateTo(path: string): Promise<void> {
        const url = new URL(path, env).toString();
        await this.page.goto(url, { timeout: shortTimeout });
    }

    protected async navigateIfNotOnPage(targetPath: string): Promise<void> {
        const currentPageUrl = this.page.url();
        const targetUrl = new URL(targetPath, env).toString();

        if (!currentPageUrl.includes(targetUrl)) {
            await this.navigateTo(targetPath);
        }
    }

    async switchToIframe(selector: string): Promise<Frame> {
        const frameHandle = await this.page.waitForSelector(selector, { timeout: shortTimeout });
        const frame = await frameHandle.contentFrame();
        if (!frame) throw new Error('Frame not found');
        return frame;
    }

    async scrollToAndClick(selector: string): Promise<void> {
        await this.page.waitForSelector(selector, { timeout: shortTimeout });
        await this.page.locator(selector).scrollIntoViewIfNeeded();
        await this.page.click(selector);
    }

    async waitForPageFullyLoaded(): Promise<void> {
        await this.page.waitForFunction("() => page.evaluate('document.readyState').equals('complete')");
    }

    async waitForURL(expectedUrl: string, timeout = shortTimeout): Promise<void> {
        await this.page.waitForURL(expectedUrl, { timeout: timeout });
    }
}
