import { test, expect } from "@playwright/test";

test.describe("toggle tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("add pushups as an exercise, then add two sets, and toggle one as completed, followed by all as completed", async ({ page }) => {
    await page.click(".AddExerciseMenu .button");
    await page.click("text=Chest");
    await page.click("text=Pushups");
    await expect(page.locator('h3:text("Pushups")')).toBeVisible();
    await expect(page.locator("text=Set 1:")).toBeVisible();

    await page.click('.addSetButton');
    await page.click('.addSetButton');
    await expect(page.locator("text=Set 2:")).toBeVisible();
    await expect(page.locator("text=Set 3:")).toBeVisible();

    await expect(page.locator('.toggleSetComplete input[type="checkbox"]')).toHaveCount(3);


    // Toggle the first set as completed by checking its checkbox
    // Here's assuming the checkboxes for sets can be indexed similarly to how they are added
    await page.check('.setContainer:nth-child(1) .setCheckbox');

    // Verify the first set is marked as completed
    // Assuming checking the checkbox changes its state visibly
    await expect(page.locator('.setContainer:nth-child(1) .setCheckbox')).toBeChecked();

    // If there's a specific action to mark all as completed, perform that action
    // For this example, we'll check all checkboxes manually
    await page.check('.setContainer:nth-child(2) .setCheckbox');
    await page.check('.setContainer:nth-child(3) .setCheckbox');

    // Verify all sets are marked as completed
    const checkedSets = page.locator('.setCheckbox:checked');
    await expect(checkedSets).toHaveCount(3);
  });
});