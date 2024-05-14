import { device, waitFor } from 'detox';
import { MACHINE_STATE_TAB } from '../screens/machineStateTab';
import { elementIsVisible } from './interactions';

// eslint-disable-next-line no-undef
beforeAll(async () => {
  await device.launchApp({ newInstance: true, delete: false });
});

// eslint-disable-next-line no-undef
afterEach(async () => {
  await device.reloadReactNative();
  if (!(await elementIsVisible(MACHINE_STATE_TAB.PLEASE_LOG_PART_ELEMENT_BY_ID))) {
    await waitFor(
      MACHINE_STATE_TAB.RESET_MACHINE_DATA_ELEMENT_BY_TEXT
    ).toBeVisible();
  }
});
