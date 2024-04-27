import { by, element, expect, waitFor } from 'detox';

export const selectPickerValue = async (
  touchableId: string,
  pickerId: string,
  doneId: string,
  column: number = 0,
  index: number | null = null,
  value: string
): Promise<void> => {
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

export async function elementIsVisible(
  element: Detox.NativeElement | Detox.IndexableNativeElement
): Promise<boolean> {
  try {
    waitFor(element).toBeVisible();
    await expect(element).toBeVisible();
    return true;
  } catch (e) {
    return false;
  }
}

export async function getTextFromElement(
  element: Detox.NativeElement
): Promise<string> {
  await waitFor(element).toBeVisible();
  const attributes = await element.getAttributes();
  let text = null;
  if (!('elements' in attributes)) {
    text = attributes.text;
  } else {
    text = attributes.elements[0].text;
  }
  if (!text) {
    text = '';
  }
  return text.trim();
}

export async function validateText(
  text: string,
  expectedText: string
): Promise<void> {
  if (text !== expectedText) {
    throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
  }
}
