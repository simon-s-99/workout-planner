import { test, expect } from "@playwright/test";

test.describe("Exercise component tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then switch weekday from monday to friday and add ", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Chest");
    await page.click("text=Pushups");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Pushups")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.weekday-label:text("Friday")'); //friday

    await page.click(".AddExerciseMenu .button");
    await page.click("text=Glutes");
    await page.click("text=Barbell Hip Thrust");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Barbell Hip Thrust")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();
    await expect(page.locator('p:text("Pushups")')).not.toBeVisible(); //ensure that pushups is not visable on friday
  });
  
});
