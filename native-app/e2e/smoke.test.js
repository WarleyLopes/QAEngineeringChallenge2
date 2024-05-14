import { expect, by, device, element, waitFor } from 'detox';

import { LOG_PART_TAB } from './test-assets/screens/logPartTab';
import { MACHINE_STATE_TAB } from './test-assets/screens/machineStateTab';

describe('Smoke Tests', () => {
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
    //app is adding an extra whitespace that is not visible in the UI
    const arcStabilityText =
      device.getPlatform() === 'ios' ? 'arcStability: 10 ' : 'arcStability: 10\n';
    await expect(MACHINE_STATE_TAB.MACHINE_PARTS.atIndex(0)).toHaveText(
      arcStabilityText
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
    await waitFor(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
    await expect(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID).toBeVisible();
  });
});
