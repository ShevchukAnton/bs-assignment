import { devices } from "playwright-core";
import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: 'tests',
    testMatch: '**.spec.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: 1,
    reporter: 'html',
    use: {
        trace: 'retry-with-trace'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    timeout: 30000
});
