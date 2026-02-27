import { Page, Locator, FileChooser, Download } from '@playwright/test';

export async function uploadFile(
  page: Page,
  selector: string,
  filePath: string | string[]
): Promise<void> {
  const element = page.locator(selector);

  const tagName = await element.evaluate(el => el.tagName.toLowerCase());
  const type = await element.getAttribute('type');

  if (tagName === 'input' && type === 'file') {
    await element.setInputFiles(filePath);
    return;
  }

  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    element.click(),
  ]);

  await chooser.setFiles(filePath);
}

export async function downloadFile(
  page: Page,
  triggerLocator: Locator
): Promise<string> {
  const downloadPromise = page.waitForEvent('download');
  await triggerLocator.click();

  const download = await downloadPromise;
  const filePath = await download.path();

  if (!filePath) {
    throw new Error('Download failed: file path is null');
  }

  return filePath;
}