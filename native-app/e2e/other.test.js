import { expect, by, device, element, waitFor } from 'detox';

import { LOG_PART_TAB } from './test-assets/screens/logPartTab';
import { MACHINE_STATE_TAB } from './test-assets/screens/machineStateTab';
import { elementIsVisible } from './test-assets/utils/interactions';

describe('Start Tests', () => {
  it('Should load up', async () => {
    //app loads by default on machine state tab so tab should be visible
    await waitFor(MACHINE_STATE_TAB.TAB_TITLE).toBeVisible();

    //log part tab should be visible
    await waitFor(LOG_PART_TAB.TAB_TITLE).toBeVisible();

    //reset machine data and calculate health buttons should be visible
    await waitFor(MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_ID).toBeVisible();
    await waitFor(MACHINE_STATE_TAB.CALCULATE_HEALTH_ELEMENT_BY_ID).toBeVisible();

    //the app should ask to log a part when there is none
    if (await elementIsVisible(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID)) {
      await MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_ID.tap();
    } else {
      await MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT.tap();
    }
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();

    //asserts of all elements visibility
    await expect(MACHINE_STATE_TAB.TAB_TITLE).toBeVisible();
    await expect(LOG_PART_TAB.TAB_TITLE).toBeVisible();
    await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
    await expect(MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_ID).toBeVisible();
  });

  it('Should navigate between tabs accordingly', async () => {
    await LOG_PART_TAB.navigateTo();
    await expect(LOG_PART_TAB.TAB_TITLE).toBeVisible();
    await expect(LOG_PART_TAB.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await expect(MACHINE_STATE_TAB.TAB_TITLE).toBeVisible();

    await MACHINE_STATE_TAB.navigateTo();
    await expect(MACHINE_STATE_TAB.TAB_TITLE).toBeVisible();
    await expect(MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_ID).toBeVisible();
    await expect(LOG_PART_TAB.TAB_TITLE).toBeVisible();
  });

  it('Tap to please log a part should navigate to log part tab', async () => {
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
    if (await elementIsVisible(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID)) {
      await MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID.tap();
    } else {
      await MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT.tap();
    }
    await waitFor(LOG_PART_TAB.TAB_TITLE).toBeVisible();
    await waitFor(LOG_PART_TAB.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await waitFor(LOG_PART_TAB.SAVE_BUTTON_ELEMENT_BY_TEXT).toBeVisible();
    await expect(LOG_PART_TAB.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await expect(LOG_PART_TAB.SAVE_BUTTON_ELEMENT_BY_TEXT).toBeVisible();
  });

  it('Should not crash if calculate health with no parts logged', async () => {
    await MACHINE_STATE_TAB.resetMachineData();
    await MACHINE_STATE_TAB.calculateHealth();
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
    await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
  });
});
