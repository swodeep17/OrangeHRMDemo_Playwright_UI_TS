import { Locator } from "@playwright/test";

export class ElementUtils {

    async getDisabledElementText(element: Locator) {
        return await element.evaluate(el => el.textContent?.trim());
    }

    async getInnerText(element: Locator) {
        return await element.innerText();
    }

    async getTextContent(element: Locator) {
        return await element.textContent();
    }

    async isElementDisabled(element: Locator) {
        return await element.isDisabled();
    }
}