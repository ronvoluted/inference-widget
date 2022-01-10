import { test, expect } from '@playwright/test';

test.describe('basic user flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://inference-widget.onrender.com/');
  });

  test.skip('objects and labels', async ({ page }) => {
    const title = page.locator('main h1').first();
    await expect(title).toHaveText('Inference Widget');

    await page.setInputFiles('main input', './tests/animals.jpg');

    const inputDisplay = page.locator('#input .display');

    await page.locator('#input .display').waitFor();

    const inputDisplayImage = inputDisplay.locator('img').first();
    await expect(inputDisplayImage).toBeVisible();

    await page.isHidden('#input .display img:nth-child(2)'); // Loading spinner

    await expect(inputDisplay).toContainText('Zebra');

    const outputObjects = page.locator('#output .objects');
    await expect(outputObjects).toContainText('Zebra');

    const outputLabels = page.locator('#output .labels');
    await expect(outputLabels).toContainText('Water');

    const confidenceSlider = page.locator('#output .confidence input');
    await confidenceSlider.focus();
    for (let i = 0; i < 25; i++) {
      await confidenceSlider.press('ArrowRight');
    }

    await expect(outputObjects).toContainText('No objects detected');

    await page.click('#input .display button'); // Reset button

    const displayVisible = await page.locator('#input .display').isVisible();
    const outputVisible = await page.locator('#output').isVisible();

    expect(displayVisible).toBeFalsy();
    expect(outputVisible).toBeFalsy();
  });

  test('text', async ({ page }) => {
    const title = page.locator('main h1').first();
    await expect(title).toHaveText('Inference Widget');

    await page.setInputFiles('main input', './tests/alligators.jpg');

    await page.isHidden('#input .display img:nth-child(2)'); // Loading spinner

    const confidenceSlider = page.locator('#output .confidence input');
    await confidenceSlider.focus();
    for (let i = 0; i < 75; i++) {
      await confidenceSlider.press('ArrowLeft', { delay: 1 });
    }

    const outputTextParagraph = page.locator('#output .description p');
    const text = await outputTextParagraph.innerText();

    const expectedWords: ReadonlyArray<string> = ['caution', 'alligators', 'swimming', 'feeding', 'animals'];

    const foundExpectedWords = expectedWords.some((word) => text.toLowerCase().includes(word));

    if (!foundExpectedWords) {
      fail('No expected words found');
    }
  });
});
