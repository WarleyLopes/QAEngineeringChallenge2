# Mobile Test Automation for React Native Project

This repository showcases mobile test automation for a React Native project using the Detox framework. It also includes unit tests for components in the mobile app, as well as unit tests and test automation for the API.

[![CI](https://github.com/WarleyLopes/QAEngineeringChallenge2/actions/workflows/actions.yml/badge.svg)](https://github.com/WarleyLopes/QAEngineeringChallenge2/actions/workflows/actions.yml)

## Detox iOS Demonstration

![Detox iOS Demonstration](./e2e/test-assets//detox-demo.gif)

## Detox Android Demonstration

![Detox Android Demonstration](./e2e/test-assets//detox_android_demo.gif)

## Table of Contents

- [Mobile Test Automation - Detox - Smoke Tests](./e2e/smoke.test.js)
- [Mobile Test Automation - Detox - Other Tests](./e2e/other.test.js)
- [Page Object Modal for Mobile Tests - machineStateTab](./e2e/test-assets/screens/machineStateTab.ts)
- [Page Object Modal for Mobile Tests - logPartTab](./e2e/test-assets/screens/logPartTab.ts)
- [Unit Tests for Components - Jest](./components/__tests__/MachineScore.test.tsx)
- [Detox Artifacts](./artifacts/)
- [Jest Test Coverage from Unit Tests - Mobile App](./coverage/lcov-report/index.html)
- [Mobile Components/UI Snapshots](./components/__tests__/__snapshots__/)
- [Coding Test Challenge](https://github.com/BellSantCodingChallenge/QAEngineeringChallenge2?tab=readme-ov-file#bellsant-qa-engineer-coding-challenge)

## Introduction

In this repository, you will find a comprehensive set of tests for a React Native project. The tests cover both the mobile app and the API, ensuring the quality and reliability of the software.

## Mobile Test Automation

The mobile test automation is implemented using the Detox framework. Detox provides a powerful and efficient way to write end-to-end tests in either JavaScript or TypeScript for React Native applications in order to run tests for both iOS and Android with the same code. The tests simulate user interactions and verify the expected behavior of the app.

To run the mobile test automation, follow these steps:

Make sure you have [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) installed.

1. Clone the repository: `git clone https://github.com/WarleyLopes/QAEngineeringChallenge2`
2. In a new terminal window, navigate to `../backend/`
3. Run `nvm install`
4. Install the dependencies for the API with `yarn install`
5. Start the API server with: `yarn start`
6. In a new terminal window, navigate to `../native-app/`
7. Run `nvm install`
8. Install dependencies: `yarn install`
9. To test iOS, run the build with: `yarn detox:build:ios`
10. To test iOS, run the tests with: `yarn detox:test:ios`
11. To test Android, run the build with: `yarn detox:build:android`
12. To test Android, run the tests with: `yarn detox:test:android`

Artifacts for the run will be generated in case of any failing tests inside the [artifacts](./artifacts/) folder.

## Mobile Components Unit Testing

These tests ensure that individual components of the app function correctly and meet the expected behavior. The unit tests are run using the Jest framework, which provides a simple and efficient way to write and run tests in JavaScript or TypeScript and automatically generate code coverage.

To run the unit tests for the mobile components, follow these steps:

Make sure you have [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) installed.
And have node version >= 18 installed and being used through nvm.

1. Clone the repository: `git clone https://github.com/WarleyLopes/QAEngineeringChallenge2`
2. Make sure you are in `./native-app/`
3. Install dependencies: `yarn install`
4. Run the tests with: `yarn test`

## Pre-commit hooks

There is a pre-commit hook enabled under this folder to run [prettier](https://prettier.io/), [eslint](https://eslint.org/), and [jest](https://jestjs.io/) automatically on before being able to complete a commit. This allows an automatic forced run of those in order to makee sure the coode is formatted according to the defined rules of the project, eslint will enforce code quality and style guidelines according to configurations too, and jest will run the unit tests. This ensures that the codebase remains consistent, maintainable, and free of common errors as long as the tests are comprehensive and extent enough.
