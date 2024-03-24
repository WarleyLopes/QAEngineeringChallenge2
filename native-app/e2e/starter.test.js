import { expect, by, device, element, waitFor } from "detox";

describe("Start Tests", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("Should load up", async () => {
    const machineStateTextElement = element(by.text("Machine State")).atIndex(
      0
    );
    await waitFor(machineStateTextElement).toBeVisible();
    await expect(machineStateTextElement).toBeVisible();
  });
});
