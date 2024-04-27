import { element, by, waitFor } from 'detox';
import { elementIsVisible } from '../utils/interactions';

export class MACHINE_STATE_TAB {
  static readonly SCREEN_NAME: Detox.IndexableNativeElement = element(
    by.text('Machine State')
  );
  static readonly WELDING_ROBOT_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Welding Robot'));
  static readonly ARC_STABILITY_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('arcStability: 10'));
  static readonly FACTORY_HEALTH_SCORE_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Factory Health Score'));
  static readonly NOT_YET_CALCULATED_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Not yet calculated'));
  static readonly CALCULATE_HEALTH_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Calculate Health'));
  static readonly ZERO_HEALTH_SCORE_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('0.00'));
  static readonly WELDING_ROBOT_ZERO_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Welding Robot: 0.00'));
  static readonly RESET_MACHINE_DATA_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Reset Machine Data'));
  static readonly PLEASE_LOG_PART_ELEMENT_BY_TEXT: Detox.IndexableNativeElement =
    element(by.text('Please log a part to check machine health'));
  static readonly MACHINE_PARTS: Detox.IndexableNativeElement = element(
    by.id('ComponentPartsOfMachine')
  );

  static async navigateTo(): Promise<void> {
    if (
      !(await elementIsVisible(this.SCREEN_NAME.atIndex(1))) &&
      (await elementIsVisible(this.SCREEN_NAME.atIndex(0)))
    ) {
      await this.SCREEN_NAME.atIndex(0).tap();
      await waitFor(this.SCREEN_NAME.atIndex(1)).toBeVisible();
    }
  }

  static async calculateHealth(): Promise<void> {
    await waitFor(this.CALCULATE_HEALTH_ELEMENT_BY_TEXT).toBeVisible();
    await this.CALCULATE_HEALTH_ELEMENT_BY_TEXT.tap();
  }

  static async resetMachineData(): Promise<void> {
    await waitFor(this.RESET_MACHINE_DATA_ELEMENT_BY_TEXT).toBeVisible();
    await this.RESET_MACHINE_DATA_ELEMENT_BY_TEXT.tap();
  }
}
