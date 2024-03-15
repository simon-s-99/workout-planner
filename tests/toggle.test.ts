import { test, expect } from "@playwright/test";

test.describe("toggle checkbox tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then add two sets, and toggle set 2", async ({ page }) => {

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

    const checkboxSelector = '[data-testid="checkbox-exercise-0-set-1"]'; //targets the first added set

    await page.click(checkboxSelector);

    // Check if the checkbox is checked
    const isChecked = await page.isChecked(checkboxSelector);

    // Assert that the checkbox is checked
    expect(isChecked).toBe(true);
  });
});
