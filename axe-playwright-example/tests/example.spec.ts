import {expect, test} from './accessibilty.fixture';

test.describe("Главный лендинг", () => { // 2
    test("Не содержит проблем с доступностью", async ({page, accessibilityScanAndHighlight}) => {
        await test.step("Открываем страницу", async () => {
            await page.goto('https://finance.ozon.ru/');
            await expect(page.getByTestId('discount-section')).toBeVisible();
        });
        await test.step("Сканируем проблемы доступности при помощи axe", async () => {
            await accessibilityScanAndHighlight();
        });
    });
});


