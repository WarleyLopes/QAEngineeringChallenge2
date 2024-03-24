# Machine Health App (React Native Expo)

Welcome to the Machine Health App, a React Native Expo project designed to evaluate the health of various machines in an automobile factory. This README will guide you on setting up and running the app, as well as understanding its structure.

## Getting Started

To get started with the app, follow these steps:

### Prerequisites

Before you begin, make sure you have the following software installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (package manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running Expo projects)

### Installation

```bash
yarn
```

### Running the App

To run the app, use the following command:

```bash
yarn start
```

This will launch the Expo development server, and you can access the app on your device using the Expo Go app or an emulator. You can hit `i` or `a` on the keyboard to launch the ios or android app respectively.

## Project Structure

The project structure is organized as follows:

- `App.tsx`: The entry point of the Expo app, where the navigation is configured.
- `components/`: Contains reusable components used throughout the app.
- `app/`: Contains individual screens or pages/tabs of the app.
- `data/`: Stores JSON files with machine and part data for evaluation.

## Screens and Features

The app has the following screens and features:

- **Machine Health**: Allows users to select a machine, part name, and part value, and calculates the health score of the machine.

## Adding Tests

You are free to choose how you'd like to test this repo, think about options and approaches and build out (and document!) what you think would be an appropriate testing infrastructure. Hint: think about a combo of unit tests and integration tests, there is an android APK in the root of the exercise if it's helpful.

## Customization

If you would like, feel free to modify the app as needed.

## Contributing

In order to build the android app, it was necessary to add expo-constants as a dependency after having detox installed.
In order to build the ios app, it is necessary to have pod installer available globally and go into the ios folder,
and run pod install before running the ios build.

We have set up pre-commit hooks that will run eslint, prettier, and jest for unit tests. Make sure they are all passing
before you can proceed with your commit and push. In order to achieve the below requirement:

> Regression Testing Strategy: The effectiveness of your strategy to enable regression testing for future releases.

I would be setting up running the e2e detox tests on a CI environment. Smoke tests for every commit with a merge request open.
And periodically at night running a full suite of tests on the development and/or staging environments/branches

## Running the e2e tests

In order to run the e2e, it is required:

 - Having all yarn packages dependencies installed with `yarn`
 - Having ios pods installed with `cd ios && pod install && cd ..` or run `yarn ios` before proceeding
 - Run `yarn e2e` to run both the build and the tests
    - Or first run `yarn e2e:build`
    - And then `yarn e2e:test` to run the e2e detox tests

 <!-- * If testing on Android, a Pixel 3a android simulator running on API 31 and CPU arch x86_64 named `Pixel_3a_API_31_x86_64` on Android Studios' Virtual Device Manager
    Or you can get around by creating it, if you have the dependencies installed locally, with the command `avdmanager create avd --name 'Pixel_3a_API_31_x86_64' --package "system-images;android-31;google_apis;x86_64" --tag google_apis --device pixel_3a` and `emulator -avd Pixel_3a_API_31_x86_64`. Still, it is necessary to have the sdk `system-images;android-31;google_apis;x86_64` installed previously either through command line or Android Studio. -->
 <!-- * If testing on Android, run `yarn e2e_android:build` to create an apk for detox assisted e2e testing.
 * If testing on iOS, running `yarn e2e_ios:build` to create the iOS build for detox assisted e2e testing. -->

## Troubleshooting

- When running e2e_android:test, if the error below happens:

    > Test suite failed to run ChildProcessError: .../Library/Android/sdk/emulator/emulator -verbose -no-audio -no-boot-anim -read-only -port 16072 @Pixel_3a_API_31_x86_64` failed with code 1

    Close all emulators open before trying to run the command again

- There are currently issues when trying to run the detox build on release modes for both iOS and Android.

    Therefore for the sake of the challenge's limited time, only iOS debug mode is supported with this fork.

- To run the android on debug/development mode, a deeper dive is necessary on launching the app in a special way for android

    As detox goes through reinstalling the app on the simulator but does not seem to be capable of launching it
    An approach talked on https://github.com/wix/Detox/issues/3650#issuecomment-1292238936 in order to manually launch the app could solve it

