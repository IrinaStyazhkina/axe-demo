import {expect, test as base} from '@playwright/test';
import HightLighter from "../utils/HightLighter";
import AxeBuilder from "@axe-core/playwright";
import AttachmentTemplateMaker from "../utils/AttachmentTemplateMaker";


type MyFixtures = {
    accessibilityScanner: AxeBuilder;
    problemsHightlighter: HightLighter;
};

export const extendedBase = base.extend<MyFixtures>({
    accessibilityScanner: async ({page}, use) => {
        const axeBuilderInstance = new AxeBuilder({page})
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
        await use(axeBuilderInstance);
    },
    problemsHightlighter: async({page}, use) => {
        const highlighter = new HightLighter(page);
        await use(highlighter);
        await highlighter.removeHighlights();
    }
});

type AccessibilityFixture = {
    accessibilityScanAndHighlight: () => Promise<void>;
};

export const test = extendedBase.extend<AccessibilityFixture>({
    accessibilityScanAndHighlight: async ({ accessibilityScanner, problemsHightlighter }, use) => {
        await use(async () => {
            const accessibilityScanResults = await accessibilityScanner.analyze();
            const testResult = new AttachmentTemplateMaker(accessibilityScanResults)
                .generateTableAttachment();
            await test.info().attach('accessibility-scan-results', {
                body: testResult,
                contentType: 'text/html',
            });
            await problemsHightlighter.highlightElements(accessibilityScanResults);
            expect(accessibilityScanResults.violations.length).toEqual(0);
        });
    },
});

export {expect} from '@playwright/test';