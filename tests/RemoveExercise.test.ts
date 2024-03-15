import { test, expect } from "@playwright/test";

test.describe("Remove exercise tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add Barbell Curl as an exercise, then remove the exercise", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Biceps");
    await page.click("text=Barbell Curl");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Barbell Curl")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.RemoveExerciseButton>label>input');
    await expect(page.locator('p:text("Barbell Curl")')).not.toBeVisible();
    await expect(page.locator("text=Set 1:")).not.toBeVisible();
    
  });
  
});