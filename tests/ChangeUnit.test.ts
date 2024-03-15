import { test, expect } from "@playwright/test";

test.describe("Exercise component tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then change the weight", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Chest");
    await page.click("text=Pushups");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Pushups")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.UnitsPicker label:text("Pounds")');
    // await weight change from 50 to 110
    const weightValue = await page.inputValue('.setInput[name="weightInput"]');
    expect(weightValue).toBe('110');

  });
});
