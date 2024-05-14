import { element, by, waitFor } from 'detox';
import { elementIsVisible } from '../utils/interactions';

const RUNNING_IOS = device.getPlatform() === 'ios';

export class MACHINE_STATE_TAB {
  static readonly TAB_TITLE: Detox.IndexableNativeElement = element(
    by.id('MachineStateTab')
  );
  static readonly WELDING_ROBOT_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Welding Robot'));
  static readonly ARC_STABILITY_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('arcStability: 10'));
  static readonly FACTORY_HEALTH_SCORE_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Factory Health Score'));
  static readonly NOT_YET_CALCULATED_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Not yet calculated'));
  static readonly CALCULATE_HEALTH_ELEMENT_BY_ID: Detox.IndexableNativeElement =
    element(by.id('MachineStateCalculateHealthButton'));
  static readonly ZERO_HEALTH_SCORE_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('0.00'));
  static readonly WELDING_ROBOT_ZERO_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Welding Robot: 0.00'));
  static readonly RESET_MACHINE_DATA_ELEMENT_BY_ID: Detox.IndexableNativeElement =
    element(by.id('MachineStateResetMachineDataButton'));
  static readonly RESET_MACHINE_DATA_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    device.getPlatform() === 'ios'
      ? element(by.text('Reset Machine Data'))
      : element(by.type('android.widget.Button').and(by.text('RESET MACHINE DATA')));
  static readonly PLEASE_LOG_PART_ELEMENT_BY_ID: Detox.IndexableNativeElement =
    element(by.id('MachineStatePleaseLogPart'));
  static readonly PLEASE_LOG_PART_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Please log a part to check machine health'));
  static readonly MACHINE_PARTS: Detox.IndexableNativeElement = element(
    by.id('ComponentPartsOfMachine')
  );

  static async navigateTo(): Promise<void> {
    if (
      !(await elementIsVisible(this.RESET_MACHINE_DATA_ELEMENT_BY_ID)) &&
      (await elementIsVisible(this.TAB_TITLE))
    ) {
      await this.TAB_TITLE.tap();
      await waitFor(this.RESET_MACHINE_DATA_ELEMENT_BY_ID).toBeVisible();
    }
  }

  static async calculateHealth(): Promise<void> {
    await waitFor(this.CALCULATE_HEALTH_ELEMENT_BY_ID).toBeVisible();
    await this.CALCULATE_HEALTH_ELEMENT_BY_ID.tap();
  }

  static async resetMachineData(): Promise<void> {
    await waitFor(this.RESET_MACHINE_DATA_ELEMENT_BY_ID).toBeVisible();
    if (await elementIsVisible(this.RESET_MACHINE_DATA_ELEMENT_BY_ID)) {
      await this.RESET_MACHINE_DATA_ELEMENT_BY_ID.tap();
    } else {
      await this.RESET_MACHINE_DATA_ELEMENT_BY_TEXT.tap();
    }
  }
}
