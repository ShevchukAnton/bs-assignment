import type { Page } from '@playwright/test';
import { expect } from "@playwright/test";
import { shortTimeout } from "./CommonUtils";

export async function waitForVisible(page: Page, locator: string, timeout = shortTimeout): Promise<boolean> {
    return await page.isVisible(locator, { timeout: timeout });
}

export async function waitForHidden(page: Page, locator: string, timeout = shortTimeout): Promise<boolean> {
    try {
        await expect.soft(page.locator(locator)).toBeHidden({ timeout: timeout });
    } catch {
        return false;
    }
    return true;
}

export async function fillTextArea(page: Page, locator: string, text: string) {
    return page.locator(locator).fill(text);
}

export async function click(page: Page, locator: string) {
    await page.waitForSelector(locator, { timeout: shortTimeout });
    await page.click(locator, { force: true });
}

export async function waitForPageToLoad(page: Page) {
    return await page.waitForLoadState('domcontentloaded');
}
