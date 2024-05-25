//@ts-ignore
import createHTMLReport from 'axe-reporter-html';
import {expect, extendedBase as test} from "./accessibilty.fixture";

test.describe('Пример с импользованием axe-reporter-html', () => {
    test("Главный лендинг не содержит проблем с доступностью", async ({page, accessibilityScanner }) => {
        await page.goto('https://finance.ozon.ru/');
        await expect(page.getByTestId('discount-section')).toBeVisible();

        const accessibilityScanResults = await accessibilityScanner.analyze();

        const html = await createHTMLReport(accessibilityScanResults)

        await test.info().attach('accessibility-scan-results-advanced', {
            body: html,
            contentType: 'text/html',
        });
        expect(accessibilityScanResults.violations.length).toEqual(0);
    });
});