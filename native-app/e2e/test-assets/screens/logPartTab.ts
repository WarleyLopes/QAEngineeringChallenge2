import { element, by, waitFor } from 'detox';
import { selectPickerValue } from '../utils/interactions';
import { PICKER_ELEMENTS } from '../components/picker';
import { elementIsVisible } from '../utils/interactions';

const RUNNING_IOS = device.getPlatform() === 'ios';

export class LOG_PART_TAB {
  static readonly TAB_TITLE: Detox.IndexableNativeElement = element(
    by.id('LogPartTab')
  );
  static readonly PART_VALUE_INPUT_ELEMENT_BY_ID: Detox.IndexableNativeElement =
    device.getPlatform() === 'ios'
      ? element(by.id('ComponentEditScreenPartValueInput'))
      : element(by.type('android.widget.EditText'));
  static readonly SAVE_BUTTON_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    RUNNING_IOS ? element(by.text('Save')) : element(by.text('SAVE'));
  static readonly SAVE_SUCCESSFUL_ELEMENT_BY_ID: Detox.IndexableNativeElement =
    element(by.id('ComponentEditScreenInfoSavedText'));

  static async navigateTo(): Promise<void> {
    if (
      !(await elementIsVisible(this.PART_VALUE_INPUT_ELEMENT_BY_ID)) &&
      (await elementIsVisible(this.TAB_TITLE))
    ) {
      await this.TAB_TITLE.tap();
      await waitFor(this.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    }
  }

  static async setMachineName(machineName: string): Promise<void> {
    await waitFor(
      element(by.id(PICKER_ELEMENTS.SELECT_PICKER_WRAPPER_ID)).atIndex(0)
    ).toBeVisible();
    await selectPickerValue(
      PICKER_ELEMENTS.SELECT_PICKER_WRAPPER_ID,
      PICKER_ELEMENTS.SELECT_PICKER_ID,
      PICKER_ELEMENTS.SELECT_DONE_ID,
      0,
      0,
      machineName
    );
  }

  static async setPartName(partName: string): Promise<void> {
    await waitFor(
      element(by.id(PICKER_ELEMENTS.SELECT_PICKER_WRAPPER_ID)).atIndex(1)
    ).toBeVisible();
    await selectPickerValue(
      PICKER_ELEMENTS.SELECT_PICKER_WRAPPER_ID,
      PICKER_ELEMENTS.SELECT_PICKER_ID,
      PICKER_ELEMENTS.SELECT_DONE_ID,
      0,
      1,
      partName
    );
  }

  static async setPartValue(partValue: string): Promise<void> {
    await waitFor(this.PART_VALUE_INPUT_ELEMENT_BY_ID).toBeVisible();
    await this.PART_VALUE_INPUT_ELEMENT_BY_ID.replaceText(partValue + '\n');
  }

  static async savePart(): Promise<void> {
    await waitFor(this.SAVE_BUTTON_ELEMENT_BY_TEXT).toBeVisible();
    await this.SAVE_BUTTON_ELEMENT_BY_TEXT.tap();
    await waitFor(this.SAVE_SUCCESSFUL_ELEMENT_BY_ID).toBeVisible();
  }

  static async logPart(
    machineName: string,
    partName: string,
    partValue: string
  ): Promise<void> {
    await this.setPartValue(partValue);
    await this.setMachineName(machineName);
    await this.setPartName(partName);
    await this.savePart();
  }

  static async navigateToAndLogPart(
    machineName: string,
    partName: string,
    partValue: string
  ): Promise<void> {
    await this.navigateTo();
    await this.logPart(machineName, partName, partValue);
  }
}
