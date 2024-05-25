import {expect, extendedBase as test} from "./accessibilty.fixture";
import AxeBuilder from "@axe-core/playwright";
import {createHtmlReport} from "axe-html-reporter";

test.describe('Пример с импользованием axe-html-reporter', () => {
    test("Главный лендинг не содержит проблем с доступностью", async ({page }) => {
        await page.goto('https://finance.ozon.ru/');
        await expect(page.getByTestId('discount-section')).toBeVisible();

        const accessibilityScanResults =
            await new AxeBuilder({page})
                .analyze();

        const reportHTML = createHtmlReport({
            results: accessibilityScanResults,
            options: {
                projectKey: 'I need only raw HTML',
                doNotCreateReportFile: true,
            },
        });

        await test.info().attach('accessibility-scan-results-advanced', {
            body: reportHTML,
            contentType: 'text/html',
        });
        expect(accessibilityScanResults.violations.length).toEqual(0);
    });
});