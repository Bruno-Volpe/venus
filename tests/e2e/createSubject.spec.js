const { test, expect } = require('@playwright/test');

test.describe('Criar Nova Disciplina', () => {
  test.beforeEach(async ({ page }) => {
    // Simula usuário autenticado no localStorage e mock do Firebase Auth/onAuthStateChanged
    await page.addInitScript(() => {
      window.localStorage.setItem('@detailUser', JSON.stringify({
        uid: 'test-user-id',
        email: 'test@venus.com'
      }));
      // Mock do onAuthStateChanged para PrivateRoute
      window.firebase = {
        auth: () => ({
          currentUser: { uid: 'test-user-id', email: 'test@venus.com' }
        })
      };
      window.firebase.auth.onAuthStateChanged = (cb) => {
        cb({ uid: 'test-user-id', email: 'test@venus.com' });
      };
    });
  });

  test('deve acessar a página de criação de disciplina', async ({ page }) => {
    await page.goto('/storeNewSubject');
    await expect(page).toHaveURL(/storeNewSubject/);
    await expect(page.locator('h1')).toContainText('Adicione');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[placeholder="Nome Materia"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Nome professor"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email professor"]')).toBeVisible();
    await expect(page.locator('input[placeholder="media da disciplinas"]')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('deve permitir digitar nos campos do formulário', async ({ page }) => {
    await page.goto('/storeNewSubject');
    await page.fill('input[placeholder="Nome Materia"]', 'Matemática');
    await page.fill('input[placeholder="Nome professor"]', 'Prof. João');
    await page.fill('input[placeholder="Email professor"]', 'prof.joao@venus.com');
    await page.fill('input[placeholder="media da disciplinas"]', '7');
    await expect(page.locator('input[placeholder="Nome Materia"]')).toHaveValue('Matemática');
    await expect(page.locator('input[placeholder="Nome professor"]')).toHaveValue('Prof. João');
    await expect(page.locator('input[placeholder="Email professor"]')).toHaveValue('prof.joao@venus.com');
    await expect(page.locator('input[placeholder="media da disciplinas"]')).toHaveValue('7');
  });
});
