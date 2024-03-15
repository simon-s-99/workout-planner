import { test, expect } from "@playwright/test";

test.describe("Reset week tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then add two sets, then toggle all sets, followed by clicking 'reset week'", async ({ page }) => {

    await page.click(".AddExerciseMenu .button");
    await page.click("text=Chest");
    await page.click("text=Pushups");
    await page.click(".AddExerciseMenu .button"); // Press again to go back and show the exercise
    await expect(page.locator('p:text("Pushups")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.AddSetButton');
    await page.click('.AddSetButton');
    await expect(page.locator("text=Set 2:")).toBeVisible();
    await expect(page.locator("text=Set 3:")).toBeVisible();

    const checkboxSelector = '.InnerExerciseContainer input[type="checkbox"]'; // Targets toggle all sets
    await page.click(checkboxSelector);

    // Re-check if the checkbox is checked
    let isChecked = await page.isChecked(checkboxSelector);
    expect(isChecked).toBe(true);

    await page.click(".ResetWeek");

    isChecked = await page.isChecked(checkboxSelector);
    // Assert that the checkbox is now unchecked
    expect(isChecked).toBe(false);
  });
});
