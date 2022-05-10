# Attractive City Front-end

This folder contains the code for the front-end artefact.

## Prerequisites

These pieces of software are required to run and develop the front-end.

- Node.js

## Structure

- `./cypress` contains test for user interface.
- `./public` contains static files such as images and HTML.
- `./src` contains code files.
- `./package.json` contains configuration for Node.js project.

## Testing

Run automatic tests to find errors in the front-end. This action should always be performed before pushing to main and deploying.

### Setup

These steps must only be followed once, the first time this use-case is performed.

1. Ensure Cypress and Jest are installed with command `npm install`.

### Execution

These steps must be performed every time you wish to perform the action in question.

1. Write `npm run cypress:open` in the terminal.
2. Run all Cypress test cases.
3. Run the command `npm test` to open the component tests.
4. Select to run all tests in the prompt that opens.

## Deploy website

To deploy the back-end. Push changes to the prod branch. Ensure the front-end is working.
