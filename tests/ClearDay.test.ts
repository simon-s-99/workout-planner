import { test, expect } from "@playwright/test";

test.describe("Exercise component tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add Deadlift as an exercise, then clear the day, removing the exercise", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Hamstrings");
    await page.click("text=Barbell Deadlift");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Barbell Deadlift")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.clear-day-button');
    await expect(page.locator(".dialog")).toBeVisible();
    await page.click('.dialog button'); //press the "yes" button
    await expect(page.locator('p:text("Barbell Deadlift")')).not.toBeVisible();

  });
  
});
