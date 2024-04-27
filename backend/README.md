# Test Automation for API

This repository showcases unit tests and test automation for an API.

## Table of Contents

- [Unit Tests for the API - Jest](./__tests__/calculate.test.ts)
- [API Test Automation - Axios Request](./__tests__/api.test.ts)
- [Jest Test Coverage from Unit Tests - API](./coverage/lcov-report/index.html)
- [Coding Test Challenge](https://github.com/BellSantCodingChallenge/QAEngineeringChallenge2?tab=readme-ov-file#bellsant-qa-engineer-coding-challenge)

## Introduction

In this repository, you will find a few set of tests for an API. With the approach of unit tests and requests through Axios.

## Tests for the API

In this section, you will find unit tests for the API and Test Automation using actual requests. These tests ensure that the API functions correctly and returns the expected results. The unit tests and the requests are also run using the Jest framework.

To run the tests for the API, follow these steps:

Make sure you have [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) installed.
And have node version >= 18 installed and being used through nvm.

1. Clone the repository: `git clone https://github.com/WarleyLopes/QAEngineeringChallenge2`
2. Make sure you are in `./backend/`
3. Install dependencies: `yarn install`
4. Run the server with: `yarn start`
5. In a separated termina, run the tests with: `yarn test`

## Pre-commit hooks

This folder has a pre-commit hook enabled to run [prettier](https://prettier.io/), [eslint](https://eslint.org/), and [jest](https://jestjs.io/) automatically on before being able to complete a commit. This allows an automatic forced run of those in order to makee sure the coode is formatted according to the defined rules of the project, eslint will enforce code quality and style guidelines according to configurations too, and jest will run the unit tests. This ensures that the codebase remains consistent, maintainable, and free of common errors as long as the tests are comprehensive and extent enough.
