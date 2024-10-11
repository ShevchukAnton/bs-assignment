import { expect, test } from '@playwright/test';
import { password, username } from 'data/TestData';
import { LoginPage } from '../pages/LoginPage';
import { TodoListPage } from "../pages/TodoListPage";
import { generateRandomString, getRandomInt } from '../utils/CommonUtils';

test.describe('Check dashboard page', async () => {

    test('Assert user can add new task to todo list', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const taskDescription = generateRandomString(30);
        await todoListPage.fillTaskDescription(taskDescription);
        await todoListPage.clickAddTodoButton();
        await todoListPage.assertTaskByText(taskDescription)
    });

    test('Assert new task stays in to todo list after re-login', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const taskDescription = generateRandomString(30);
        await todoListPage.addTask(taskDescription);

        await todoListPage.clickLogoutButton();
        await loginPage.login(username, password);
        await todoListPage.assertTaskByText(taskDescription);
    });

    test('Assert tasks list consistency after deletion and re-login', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const taskDescription = generateRandomString(30);
        const secondTaskDescription = generateRandomString(30);
        await todoListPage.addTask(taskDescription);

        await todoListPage.assertTaskByText(taskDescription);
        await todoListPage.addTask(secondTaskDescription);

        await todoListPage.assertTaskByText(secondTaskDescription);
        await todoListPage.deleteTaskByText(taskDescription);
        await todoListPage.assertTaskByText(taskDescription, false);
        await todoListPage.clickLogoutButton();
        await loginPage.login(username, password);
        await todoListPage.assertTaskByText(secondTaskDescription);
        await todoListPage.assertTaskByText(taskDescription, false);
    });

    test('Assert tasks list remains empty after deleting all tasks and re-login', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const taskDescription = generateRandomString(30);
        await todoListPage.addTask(taskDescription);
        await todoListPage.assertTaskByText(taskDescription);
        await todoListPage.deleteAllTasks();
        await todoListPage.assertTaskListIsEmpty();
        await todoListPage.clickLogoutButton();
        await loginPage.login(username, password);
        await todoListPage.assertTaskListIsEmpty(false);
    });

    test('Assert empty tasks can not be added to the list', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const tasksAmountBefore = await todoListPage.getAllTasks();
        await todoListPage.clickAddTodoButton();
        await todoListPage.clickAddTodoButton();
        await todoListPage.clickAddTodoButton();
        const tasksAmountAfter = await todoListPage.getAllTasks();
        expect(tasksAmountBefore.length).toEqual(tasksAmountAfter.length);
    });

    test('Assert tasks with same name can be added to the list', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const tasksAmountBefore = (await todoListPage.getAllTasks());
        const taskDescription = generateRandomString(30);
        await todoListPage.addTask(taskDescription);
        const tasksAmountAfterFirstTask = await todoListPage.getAllTasks();
        expect(tasksAmountAfterFirstTask.length).toEqual(tasksAmountBefore.length + 1);
        await todoListPage.addTask(taskDescription);
        const tasksAmountAfterSecondTask = await todoListPage.getAllTasks();
        expect(tasksAmountAfterSecondTask.length).toEqual(tasksAmountBefore.length + 2);
    });

    test('Assert tasks counter displays correct amount after tasks has been added', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        await todoListPage.deleteAllTasks();
        const tasksAmount = getRandomInt(1, 100);
        await todoListPage.addRandomTasks(tasksAmount);
        const tasksCounter = await todoListPage.getTasksCounter();
        expect(tasksAmount).toEqual(tasksCounter)
    });

    test('Assert tasks counter displays correct amount after tasks has been deleted', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        await todoListPage.deleteAllTasks();
        const addedTasksAmount = getRandomInt(2, 10);
        await todoListPage.addRandomTasks(addedTasksAmount);
        const deletedTasksAmount = getRandomInt(1, addedTasksAmount - 1);
        await todoListPage.deleSomeTasks(deletedTasksAmount);
        const tasksCounter = await todoListPage.getTasksCounter();
        expect(tasksCounter).toEqual(addedTasksAmount - deletedTasksAmount)
    });

    test('Assert tasks are not saved without clicking the button', async ({ page }) => {
        const loginPage = await LoginPage.create(page);
        await loginPage.login(username, password);
        const todoListPage = await TodoListPage.create(page);
        const taskDescription = generateRandomString(30);
        await todoListPage.fillTaskDescription(taskDescription);
        await todoListPage.clickLogoutButton();
        await loginPage.login(username, password);
        await todoListPage.assertTaskByText(taskDescription, false);
    });

});
