Playwright E2E Framework
==========================================

***

Example to run E2E tests with [Playwright](https://playwright.dev/)

## Requirements

- Node version 16 or higher

## Quick start
1. Install [Node.js](https://nodejs.org/) on your machine.
   Check the version after the installation - 'node -v' in the terminal;

2. Clone the git repository;

3. Execute the command - `npm install`;

# How to run tests

You can run the tests with the following commands:

* `npx playwright test --ui` - if you want to run the tests in visual mode;
* `npx playwright test` - if you want to run the tests in silent mode.
* `npx playwright test` --project=chromium - runs the tests only on Desktop Chrome.
* `npx playwright test example` - runs the tests in a specific file.
* `npx playwright test --debug` - runs the tests in debug mode.
