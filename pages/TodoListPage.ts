import { expect } from "@playwright/test";
import { Locator } from "playwright-core";
import { click, fillTextArea, waitForHidden, waitForVisible } from "../utils/CommonActions";
import { generateRandomString } from "../utils/CommonUtils";
import { BasePage } from "./BasePage";

export class TodoListPage extends BasePage {

    protected targetPath = '/';

    private addTodoButton = '//button[text()="Add todo"]';
    private taskDescription = '//input[@placeholder="New task"]';
    private logoutButton = '//button[text()="Logout"]';
    private taskElement = '//li[text()="taskDescription"]';
    private deleteButton = '//button[@class="btn btn-danger"]'
    private tasksList = '//li[@class="list-group-item py-0 px-0 ml-3"]'
    private titleText = 'TODOs'

    async init(): Promise<void> { }


    async clickAddTodoButton() {
        await click(this.page, this.addTodoButton);
    }

    async assertAddTodoButton() {
        await waitForVisible(this.page, this.addTodoButton)
    }

    async clickLogoutButton() {
        await waitForVisible(this.page, this.logoutButton);
        await click(this.page, this.logoutButton);
    }

    async fillTaskDescription(text: string) {
        await fillTextArea(this.page, this.taskDescription, text)
    }

    async assertTaskByText(taskDescription: string, expectPresent: boolean = true) {
        let taskLocator = this.taskElement.replace('taskDescription', taskDescription)
        expectPresent ? await waitForVisible(this.page, taskLocator) : await waitForHidden(this.page, taskLocator);
    }

    async assertTaskListIsEmpty(expectEmpty: boolean = true) {
        let taskLocator = await this.getAllTasks();
        expectEmpty ? expect(taskLocator.length).toBe(0) : expect(taskLocator.length).toBeGreaterThan(0)
    }

    async deleteTaskByText(taskDescription: string) {
        let taskLocator = this.taskElement.replace('taskDescription', taskDescription)
        await waitForVisible(this.page, taskLocator)
        await this.page.locator(taskLocator).locator(this.deleteButton).click()
    }

    async getAllTasks(): Promise<Array<Locator>> {
        await this.waitForPageFullyLoaded()
        return this.page.locator(this.tasksList).all();
    }

    async deleteAllTasks() {
        let tasks = await this.getAllTasks();
        if (tasks.length > 0) {
            let redButtons = await this.page.locator(this.deleteButton).all()
            for (const delButton of redButtons) {
                await delButton.click()
            }
        }


    }

    async addTask(taskDescription: string) {
        await this.fillTaskDescription(taskDescription);
        await this.clickAddTodoButton();
    }

    async addRandomTasks(tasksAmount: number) {
        for (let i = 0; i < tasksAmount; i++) {
            let taskDescription = generateRandomString(10);
            await this.addTask(taskDescription);
        }
    }

    async getTasksCounter() {
        let title = await this.page.getByText(this.titleText).innerText()
        var matches = title.match(/\((\d+)\)/);

        if (matches) {
            let counter = matches[1];
            return Number(counter)
        } else {
            return 0
        }
    }

    async deleSomeTasks(deletedTasksAmount: number) {
        let tasks = await this.getAllTasks();
        if (deletedTasksAmount < tasks.length) {
            let redButtons = await this.page.locator(this.deleteButton).all()
            for (let i = 0; i < deletedTasksAmount; i++) {
                let delButton = redButtons[Math.floor(Math.random() * tasks.length)]
                await delButton.click()
            }
        } else {
            throw RangeError(`Requested amount of tasks ${deletedTasksAmount} to delete is more then total tasks ${tasks.length} in the list`)
        }
    }
}