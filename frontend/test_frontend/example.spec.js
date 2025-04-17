// @ts-check
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://sensachef.onrender.com');
  await page.getByRole('button', { name: 'Cook Now' }).first().click();
  await page.getByRole('button', { name: 'Start Cooking' }).click();
  await page.getByText('Login').click();
  await page.getByText('Sign-Up').click();
  await page.getByText('Help', { exact: true }).click();
});
