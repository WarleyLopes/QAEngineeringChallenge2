import { expect, by, device, element, waitFor } from 'detox';

import { LOG_PART_TAB } from './test-assets/screens/logPartTab';
import { MACHINE_STATE_TAB } from './test-assets/screens/machineStateTab';

describe('Start Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
    await waitFor(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await waitFor(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
  });

  it('Should load up', async () => {
    //app loads by default on machine state tab so both should be visible
    await waitFor(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await waitFor(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();

    //log part tab should be visible
    await waitFor(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();

    //reset machine data and calculate health buttons should be visible
    await waitFor(
      MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT
    ).toBeVisible();
    await waitFor(MACHINE_STATE_TAB.CALCULATE_HEALTH_ELEMENT_BY_TEXT).toBeVisible();

    //the app should ask to log a part when there is none
    await MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT.tap();
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();

    //asserts of all elements visibility
    await expect(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await expect(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
    await expect(MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT).toBeVisible();
  });

  it('Should navigate between tabs accordingly', async () => {
    await LOG_PART_TAB.navigateTo();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
    await expect(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();

    await MACHINE_STATE_TAB.navigateTo();
    await expect(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await expect(MACHINE_STATE_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
  });

  // it('Should not crash if calculate health with no parts logged', async () => {
  //   await MACHINE_STATE_TAB.resetMachineData();
  //   await MACHINE_STATE_TAB.calculateHealth();
  //   await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
  //   await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
  // });

  it('Tap to please log a part should navigate to log part tab', async () => {
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
    await MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT.tap();
    await waitFor(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await waitFor(LOG_PART_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
    await waitFor(LOG_PART_TAB.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await waitFor(LOG_PART_TAB.SAVE_BUTTON_ELEMENT_BY_TEXT).toBeVisible();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(0)).toBeVisible();
    await expect(LOG_PART_TAB.SCREEN_NAME.atIndex(1)).toBeVisible();
    await expect(LOG_PART_TAB.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await expect(LOG_PART_TAB.SAVE_BUTTON_ELEMENT_BY_TEXT).toBeVisible();
  });

  it('App should log machine with part quality and calculate factory score', async () => {
    await LOG_PART_TAB.navigateToAndLogPart('Welding Robot', 'Arc Stability', 10);
    //successful message should appear and disappear when saving
    await expect(LOG_PART_TAB.SAVE_SUCCESSFUL_ELEMENT_BY_ID).toBeVisible();
    await waitFor(LOG_PART_TAB.SAVE_SUCCESSFUL_ELEMENT_BY_ID).not.toBeVisible();
    // switch back to machine state tab
    await MACHINE_STATE_TAB.navigateTo();
    //Welding Robot text should exist
    const weldingRobotElementByText = element(by.text('Welding Robot'));
    await waitFor(weldingRobotElementByText).toBeVisible();
    await expect(weldingRobotElementByText).toBeVisible();
    //check if parts in machines are visible
    await waitFor(MACHINE_STATE_TAB.MACHINE_PARTS.atIndex(0)).toBeVisible();
    await expect(MACHINE_STATE_TAB.MACHINE_PARTS.atIndex(0)).toBeVisible();
    await expect(MACHINE_STATE_TAB.MACHINE_PARTS.atIndex(0)).toHaveText(
      'arcStability: 10 ' //app is adding an extra whitespace that is not visible in the UI
    );
    //Factory Health Score text should exist
    const factoryHealthScoreElementByText = element(by.text('Factory Health Score'));
    await waitFor(factoryHealthScoreElementByText).toBeVisible();
    await expect(factoryHealthScoreElementByText).toBeVisible();
    //Not yet calculated text should exist
    const notYetCalculatedElementByText = element(by.text('Not yet calculated'));
    await waitFor(notYetCalculatedElementByText).toBeVisible();
    await expect(notYetCalculatedElementByText).toBeVisible();
    //click to calculate health
    await MACHINE_STATE_TAB.calculateHealth();
    //0.00 text should exist as the machine health score is 0 because arcStability is below normal range
    const zeroHealthScoreElementByText = element(by.text('0.00'));
    await waitFor(zeroHealthScoreElementByText).toBeVisible();
    await expect(zeroHealthScoreElementByText).toBeVisible();
    //Welding Robot: 0.00 text should exist as all machines score are 0
    const weldingRobotZeroElementByText = element(by.text('Welding Robot: 0.00'));
    await waitFor(weldingRobotZeroElementByText).toBeVisible();
    await expect(weldingRobotZeroElementByText).toBeVisible();
    //taps to reset machine data to reset state
    await MACHINE_STATE_TAB.resetMachineData();
    //Please log a part to check machine health text should exist
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
    await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_TEXT).toBeVisible();
  });
});
