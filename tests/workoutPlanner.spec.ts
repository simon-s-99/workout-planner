import { test, expect } from "@playwright/test";

test.describe("Exercise component tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("adding a new set to an empty exercise", async ({ page }) => {
    await page.click("text=Add Set");
    await expect(page.locator("text=Set 1:")).toBeVisible();
  });

  test("removing a set from an exercise with multiple sets", async ({ page }) => {
    // Add three sets
    for (let i = 0; i < 3; i++) {
      await page.click("text=Add Set");
    }

    // Assume sets are added in order and the first set you want to remove is 'Set 1:'
    // The example below assumes that each set is in a list item (`li`) and you are targeting the first one
    const firstSetRemoveButton = page.locator('#todoList li:nth-child(1) button:has-text("❌")');

    await firstSetRemoveButton.click();

    // After removal, verify that 'Set 1:' is no longer visible
    // This assumes that the text 'Set 1:' is unique to the first set and is removed from the DOM or hidden upon deletion
    await expect(page.locator("text=Set 1:")).not.toBeVisible();

    // Optionally, verify the total count of sets to ensure it's decreased by one
    // This step depends on how you display the total count of sets (if at all)
    // For example:
    // await expect(page.locator("text=Total Sets:")).toContainText("2");
  });

  test("toggle the completion status of a set", async ({ page }) => {
    await page.click("text=Add Set");
    const checkbox = page.locator('text=Set 1: >> input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });
});
