import { test, expect } from "@playwright/test";

test.describe("Exercise component tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then add a set, then remove it, then remvoe the exercise", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Chest");
    await page.click("text=Pushups");
    await page.click(".AddExerciseMenu .button"); //press again in order to go back and show the exercise
    await expect(page.locator('p:text("Pushups")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.addButton');
    await expect(page.locator("text=Set 2:")).toBeVisible();

    await page.click('.inputAndButtonContainer>button');
    await expect(page.locator("text=Set 2:")).not.toBeVisible();

    await page.click('.RemoveExerciseButton>label>input');
    await expect(page.locator('p:text("Pushups")')).not.toBeVisible();

  });
  
});
