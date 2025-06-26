// Teste e2e de login organizado na pasta correta.
const { test, expect } = require('@playwright/test');

test.describe('Página de Login', () => {
  test('deve exibir a página de login corretamente', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1.display-4')).toBeVisible();
    await expect(page.locator('h1.display-4')).toHaveText('Venus');
    await expect(page.locator('button')).toContainText('Continue with Google');
  });

  test('deve exibir o logo e a descrição', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('img[alt="logo"]')).toBeVisible();
    await expect(page.locator('small')).toHaveText('Um sistema para você não surtar');
  });

  test('deve ter o botão de login com Google', async ({ page }) => {
    await page.goto('/login');
    const loginButton = page.locator('button', { hasText: 'Continue with Google' });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toHaveClass(/w-75/);
    await expect(loginButton.locator('i')).toHaveClass(/fab fa-google/);
  });
});
