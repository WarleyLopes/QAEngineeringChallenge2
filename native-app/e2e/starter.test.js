import { expect, by, device, element, waitFor } from 'detox';

describe('Start Tests', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  // TODO: Build page object approach for screens, elements, and actions
  //  Screen object should have all the elements within screens built on the app
  //   to avoid repeating the same element selectors in multiple tests
  //    and to make it easier to maintain the tests
  //  Action objects should contain reusable actions that can be used across multiple tests
  //   in order to avoid repeating the same actions in multiple tests
  //    and to make it easier to maintain the tests
  //    ps: not done here in order to save time for the challenge but it is a good practice

  // TODO: Analyze why detox starts failing to find elements by text after
  //  running await device.reloadReactNative() in the beforeEach hook

  it('Should load up', async () => {
    const machineStateTextElement = element(by.text('Machine State')).atIndex(0);
    await waitFor(machineStateTextElement).toBeVisible();
    await expect(machineStateTextElement).toBeVisible();
  });

  it('Should ask to log a part if no parts are logged', async () => {
    const resetMachineDataElementByText = element(by.text('Reset Machine Data'));
    await waitFor(resetMachineDataElementByText).toBeVisible();
    await resetMachineDataElementByText.tap();
    const pleaseLogPartElementByText = element(
      by.text('Please log a part to check machine health')
    );
    await waitFor(pleaseLogPartElementByText).toBeVisible();
    await expect(pleaseLogPartElementByText).toBeVisible();
  });

  it('Should navigate between tabs accordingly', async () => {
    const machineStateTabElementByText = element(by.text('Machine State'));
    const logPartTabElementByText = element(by.text('Log Part'));
    // Waits for app to load to tap on the tab
    await waitFor(logPartTabElementByText).toBeVisible();
    await logPartTabElementByText.tap();

    // Waits for the tab to be visible as there will be two elements with the same text "Log Part"
    await waitFor(logPartTabElementByText.atIndex(0)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(0)).toBeVisible();
    await waitFor(logPartTabElementByText.atIndex(1)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(1)).toBeVisible();

    // Then taps on the other tab to navigate back, again, on this tab, there is only one element with this text
    await machineStateTabElementByText.tap();

    // Waits for the tab to be visible as there will be two elements with the same text "Machine State"
    await waitFor(machineStateTabElementByText.atIndex(0)).toBeVisible();
    await expect(machineStateTabElementByText.atIndex(0)).toBeVisible();
    await waitFor(machineStateTabElementByText.atIndex(1)).toBeVisible();
    await expect(machineStateTabElementByText.atIndex(1)).toBeVisible();
  });

  it('App should not crash if calculate health with no parts logged', async () => {
    const resetMachineDataElementByText = element(by.text('Reset Machine Data'));
    await waitFor(resetMachineDataElementByText).toBeVisible();
    await resetMachineDataElementByText.tap();
    const calculateHealthElementByText = element(by.text('Calculate Health'));
    await waitFor(calculateHealthElementByText).toBeVisible();
    await calculateHealthElementByText.tap();
    const pleaseLogPartElementByText = element(
      by.text('Please log a part to check machine health')
    );
    await waitFor(pleaseLogPartElementByText).toBeVisible();
    await expect(pleaseLogPartElementByText).toBeVisible();
  });

  it('Tap to please log a part should navigate to log part tab', async () => {
    const pleaseLogPartElementByText = element(
      by.text('Please log a part to check machine health')
    );
    await waitFor(pleaseLogPartElementByText).toBeVisible();
    await pleaseLogPartElementByText.tap();
    const logPartTabElementByText = element(by.text('Log Part'));
    await waitFor(logPartTabElementByText.atIndex(0)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(0)).toBeVisible();
    await waitFor(logPartTabElementByText.atIndex(1)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(1)).toBeVisible();
  });

  // TODO: Iterate more on how to test the picker values
  //https://stackoverflow.com/questions/50082463/testing-picker-with-detox-in-react-native
  const selectPickerValue = async (
    touchableId,
    pickerId,
    doneId,
    column = 0,
    index = null,
    value
  ) => {
    if (index === null) {
      await element(by.id(touchableId)).tap();
      await element(by.id(pickerId)).setColumnToValue(column, value);
      await element(by.id(doneId)).tap();
    } else {
      await element(by.id(touchableId)).atIndex(index).tap();
      await element(by.id(pickerId)).atIndex(0).setColumnToValue(column, value);
      await element(by.id(doneId)).atIndex(0).tap();
    }
  };
  it('App should log machine with part quality and calculate factory score', async () => {
    // TODO Transform this into an action function to pass diferent values of machines,parts and values
    //  in order to test different scenarios and avoid repeating the same code
    //navigate to log part tab first
    const logPartTabElementByText = element(by.text('Log Part'));
    await waitFor(logPartTabElementByText).toBeVisible();
    await logPartTabElementByText.tap();
    //wait and validate if the navigation was successful
    await waitFor(logPartTabElementByText.atIndex(0)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(0)).toBeVisible();
    await waitFor(logPartTabElementByText.atIndex(1)).toBeVisible();
    await expect(logPartTabElementByText.atIndex(1)).toBeVisible();
    //log part without values
    const selectPickerWrapperId = 'ComponentPickerIosTouchableWrapper';
    const selectPickerId = 'ComponentPickerIos';
    const selectDoneId = 'ComponentPickerIosDone';
    await selectPickerValue(
      selectPickerWrapperId,
      selectPickerId,
      selectDoneId,
      0,
      0,
      'Welding Robot'
    );
    await selectPickerValue(
      selectPickerWrapperId,
      selectPickerId,
      selectDoneId,
      0,
      1,
      'Arc Stability'
    );
    const partValueInputElementById = element(
      by.id('ComponentEditScreenPartValueInput')
    );
    await waitFor(partValueInputElementById).toBeVisible();
    await partValueInputElementById.tap();
    await partValueInputElementById.typeText('10');
    const saveButtonElementByText = element(by.text('Save'));
    await waitFor(saveButtonElementByText).toBeVisible();
    await saveButtonElementByText.tap();
    const saveSuccessfullElementById = element(
      by.id('ComponentEditScreenInfoSavedText')
    );
    //successful message should appear and disappear
    await waitFor(saveSuccessfullElementById).toBeVisible();
    await expect(saveSuccessfullElementById).toBeVisible();
    await waitFor(saveSuccessfullElementById).not.toBeVisible();
    // switch back to machine state tab
    const machineStateTabElementByText = element(by.text('Machine State'));
    await machineStateTabElementByText.tap();
    await waitFor(machineStateTabElementByText.atIndex(0)).toBeVisible();
    await expect(machineStateTabElementByText.atIndex(0)).toBeVisible();
    await waitFor(machineStateTabElementByText.atIndex(1)).toBeVisible();
    await expect(machineStateTabElementByText.atIndex(1)).toBeVisible();
    //Welding Robot text should exist
    const weldingRobotElementByText = element(by.text('Welding Robot'));
    await waitFor(weldingRobotElementByText).toBeVisible();
    await expect(weldingRobotElementByText).toBeVisible();
    //arcStability: 10 text should exist
    const arcStabilityElementByText = element(by.text('arcStability: 10'));
    await waitFor(arcStabilityElementByText).toBeVisible();
    await expect(arcStabilityElementByText).toBeVisible();
    //Factory Health Score text should exist
    const factoryHealthScoreElementByText = element(by.text('Factory Health Score'));
    await waitFor(factoryHealthScoreElementByText).toBeVisible();
    await expect(factoryHealthScoreElementByText).toBeVisible();
    //Not yet calculated text should exist
    const notYetCalculatedElementByText = element(by.text('Not yet calculated'));
    await waitFor(notYetCalculatedElementByText).toBeVisible();
    await expect(notYetCalculatedElementByText).toBeVisible();
    //click to calculate health
    const calculateHealthElementByText = element(by.text('Calculate Health'));
    await calculateHealthElementByText.tap();
    //0.00 text should exist as the machine health score is 0 because arcStability is below normal range
    const zeroHealthScoreElementByText = element(by.text('0.00'));
    await waitFor(zeroHealthScoreElementByText).toBeVisible();
    await expect(zeroHealthScoreElementByText).toBeVisible();
    //Welding Robot: 0.00 text should exist as all machines score are 0
    const weldingRobotZeroElementByText = element(by.text('Welding Robot: 0.00'));
    await waitFor(weldingRobotZeroElementByText).toBeVisible();
    await expect(weldingRobotZeroElementByText).toBeVisible();
    //taps to reset machine data to reset state
    const resetMachineDataElementByText = element(by.text('Reset Machine Data'));
    await resetMachineDataElementByText.tap();
    //Please log a part to check machine health text should exist
    const pleaseLogPartElementByText = element(
      by.text('Please log a part to check machine health')
    );
    await waitFor(pleaseLogPartElementByText).toBeVisible();
    await expect(pleaseLogPartElementByText).toBeVisible();
  });
});
