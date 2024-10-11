# backslash-ui-tests
Project for automation tests based on [playwright framework](https://playwright.dev/) for UI tests.
Default playwright dashboard used for reporting.

UI tests using [Page Object Model pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

## HOW-TO guide

1. **Install [Node.js](https://nodejs.org/)**:
  - To see if Node.js is installed, type `node -v` in the terminal.

2. **Clone this project**:
  - `git clone `

3. **To run tests**:

  - **UI Tests**:
    - Navigate to `uiTests` folder in terminal.
    - Type `npm ci` command and run it.
    - To run tests on different environment - set `NODE_ENV` system variable to desired env. List of environments can be found in `uiTests/data/TestData.ts`
    - Run all tests with `npx playwright test`
    - To see html report run `npx playwright show-report`
