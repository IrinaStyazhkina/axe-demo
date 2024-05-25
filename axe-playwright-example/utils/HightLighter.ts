import {Page} from 'playwright';
import {Locator, test} from "@playwright/test";
import {AxeScanResult, Impact} from "./types";

class Highlighter {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async highlightElements(data: AxeScanResult): Promise<void> {
        let globalCounter = 0;
        for (const item of data.violations) {
            for(const node of item.nodes)  {
                await this.highlightElement(++globalCounter, this.page.locator(node.target[0].toString()), this.page, node.impact);
            }
        }
        const screenshot = await this.page.screenshot({fullPage: true});
        await test.info().attach('Violations on page', {body: screenshot, contentType: 'image/png'});
    }

    async removeHighlights(): Promise<void> {
        await this.page.evaluate(() => {
            document.querySelectorAll('.violations-border').forEach(
                el => el.remove()
            );
            document.querySelectorAll('.violations-index').forEach(
                el => el.remove()
            );
        });
    }

    private async highlightElement(index: number, element: Locator, page: Page, impact: Impact) {
        const boundingBox = await element.boundingBox();
        const color = this.getImpactColor(impact);

        await page.evaluate(({
                                 boundingBox,
                                 index,
                                 color}) => {
            const customDiv = document.createElement('div');
            customDiv.className = 'violations-border';
            customDiv.style.position = 'absolute';
            customDiv.style.left = `${boundingBox?.x ?? 0}px`;
            customDiv.style.top = `${boundingBox?.y ?? 0}px`;
            customDiv.style.width = `${boundingBox?.width ?? 0}px`;
            customDiv.style.height = `${boundingBox?.height ?? 0}px`;
            customDiv.style.border = `2px solid ${color}`;

            document.body.appendChild(customDiv);

            const customSpan = document.createElement('b');
            customSpan.className = 'violations-index';
            customSpan.style.position = 'absolute';
            customSpan.innerText = index + '';
            customSpan.style.color = color;
            customSpan.style.left = `${boundingBox?.x - 20}px`;
            customSpan.style.top = `${boundingBox?.y}px`;

            document.body.appendChild(customDiv);
            document.body.appendChild(customSpan);

        }, {boundingBox, index, color});
    }

    private getImpactColor = (impact: Impact) => {
        switch(impact){
            case "critical":
                return "#da1e28";
            case "serious":
                return "#ff832b";
            case "moderate":
                return "#f1c21b";
            case "minor":
                return "#add8e6";
            default: throw new Error("Unknown impact");
        }
    }
}

export default Highlighter;