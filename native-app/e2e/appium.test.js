const { remote } = require('webdriverio');
const assert = require('assert');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Pixel_3a_API_31_x86_64',
  'appium:app': '../MachineHealth.apk',
  'appium:avdArgs': '-no-skin -no-audio -no-window' // Ensure the emulator runs with a visible UI
};

const wdOpts = {
  hostname: '127.0.0.1',
  port: 4723,
  logLevel: 'info',
  capabilities
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    // Example test: Check if an element is displayed and interact with it
    const element = await driver.$(
      '//*[@text="Please log a part to check machine health"]'
    );
    await element.waitForDisplayed();
    assert(await element.isDisplayed());
    await element.click();
    const machineNameElement = await driver.$('//*[@text="Machine Name"]');
    await machineNameElement.waitForDisplayed();
    assert(await machineNameElement.isDisplayed());
  } catch (error) {
    console.error('Test failed', error);
  } finally {
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
