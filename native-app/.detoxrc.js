/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? 'debug' : undefined
  },
  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/jest.config.js',
      _: ['e2e']
    }
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: 'failing'
    }
  },
  apps: {
    'ios.release': {
      type: 'ios.app',
      build:
        'xcodebuild -workspace ios/app.xcworkspace -scheme app -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/app.app'
    },
    'android.release': {
      type: 'android.apk',
      build:
        'cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk'
    },
    'ios.debug': {
      type: 'ios.app',
      build:
        'xcodebuild -workspace ios/app.xcworkspace -scheme app -configuration Debug -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/app.app'
    },
    'android.debug': {
      type: 'android.apk',
      build:
        'cd android && ./gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug && cd ..',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      reversePorts: [8081, 8097, 3000, 3001, 5037, 9088, 9089]
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_31_x86_64'
      }
    }
  },
  configurations: {
    'ios.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.release': {
      device: 'emulator',
      app: 'android.release'
    },
    'ios.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.debug': {
      device: 'emulator',
      app: 'android.debug'
    }
  },
  artifacts: {
    rootDir: 'e2e/test-assets/artifacts/',
    plugins: {
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true
      }
    }
  }
};
