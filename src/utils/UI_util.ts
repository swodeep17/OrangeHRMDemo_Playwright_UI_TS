import { Page, Locator, expect, BrowserContext, Frame } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";

export class ScrollUtils {

    constructor(private page: Page) { }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    async scrollToBottom() {
        await this.page.evaluate(() =>
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        );
    }

    async scrollToElement(element: Locator) {
        await element.scrollIntoViewIfNeeded();
    }

    async scrollBy(x: number, y: number) {
        await this.page.mouse.wheel(x, y);
    }

    async scrollInsideElement(element: Locator, x: number, y: number) {
        await element.evaluate((el, { x, y }) => {
            el.scrollBy(x, y);
        }, { x, y });
    }
}

export class MouseKeyboardUtils {

    constructor(private page: Page) { }

    async hover(element: Locator) {
        await element.hover();
    }

    async rightClick(element: Locator) {
        await element.click({ button: "right" });
    }

    async dragAndDrop(source: Locator, target: Locator) {
        await source.dragTo(target);
    }

    async holdKey(key: string, time = 500) {
        await this.page.keyboard.down(key);
        await this.page.waitForTimeout(time);
        await this.page.keyboard.up(key);
    }

    async pressKeysSequential(keys: string[]) {
        for (const key of keys) {
            await this.page.keyboard.press(key);
        }
    }

    async pressKeysAtOnce(keys: string[]) {
        const combo = keys.join("+"); // ex: Shift+Alt+A
        await this.page.keyboard.press(combo);
    }

    async mouseClickAndHold(x: number, y: number, time = 500) {
        await this.page.mouse.move(x, y);
        await this.page.mouse.down();
        await this.page.waitForTimeout(time);
        await this.page.mouse.up();
    }
}

export class CssUtils {

    async getCssValue(element: Locator, property: string) {
        return await element.evaluate((el, prop) =>
            window.getComputedStyle(el).getPropertyValue(prop)
            , property);
    }

    async getBackgroundColor(element: Locator) {
        return this.getCssValue(element, "background-color");
    }

    async getColor(element: Locator) {
        return this.getCssValue(element, "color");
    }
}

export class ValidationImageURLUtils {

    constructor(private page: Page, private request: APIRequestContext) { }

    async isImageLoaded(selector: string) {
        return await this.page.$eval(selector, (img: HTMLImageElement) => {
            return img.complete && img.naturalHeight > 0;
        });
    }

    async validateUrlStatus(url: string) {
        const response = await this.request.get(url);
        return {
            status: response.status(),
            ok: response.ok()
        };
    }

    async validateAllLinks() {
        const links = await this.page.$$eval("a", (anchors) =>
            anchors.map(a => a.href)
        );

        let results = [];
        for (const url of links) {
            const res = await this.request.get(url);
            results.push({
                url,
                status: res.status(),
                ok: res.ok()
            });
        }

        return results;
    }
}

export class Windows_frames_popups_visual_Utils {
    // ============================================
    // 1. WINDOW HANDLING (Parent + Child Windows)
    // ============================================
    static async switchToNewWindow(
        context: BrowserContext,
        action: () => Promise<void>
    ) {
        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            action() // the click that opens the new window
        ]);

        await newPage.waitForLoadState();
        return newPage;
    }

    /*
    Scenario                                                                Best choice                         Why
    You click a button on the current page that opens a popup               page.waitForEvent('popup')          Strongly ties the new page to the correct opener (less flaky)
    You’re not sure which page triggers the new tab, or any page could      context.waitForEvent('page')        Listens globally within the context
    SSO or third‑party auth opens a new window/tab                          context.waitForEvent('page')        The opener might not be the current page
    */

    static async getAllWindows(context: BrowserContext) {
        return context.pages();
    }


    // ============================================
    // 2. ALERT / POPUP / PROMPT HANDLING
    // ============================================
    static async acceptAlert(page: Page, action: () => Promise<void>) {
        page.once("dialog", dialog => dialog.accept());
        await action();
    }

    static async rejectAlert(page: Page, action: () => Promise<void>) {
        page.once("dialog", dialog => dialog.dismiss());
        await action();
    }

    static async handlePrompt(
        page: Page,
        text: string,
        action: () => Promise<void>
    ) {
        page.once("dialog", dialog => dialog.accept(text));
        await action();
    }


    // ============================================
    // 3. FRAME HANDLING (Nested, Name, URL)
    // ============================================
    static getFrameByName(page: Page, frameName: string): Frame {
        const frame = page.frame({ name: frameName });
        if (!frame) throw new Error(`Frame '${frameName}' not found`);
        return frame;
    }

    static getFrameByUrl(page: Page, urlContains: string): Frame {
        const frame = page.frame(f => f.url().includes(urlContains));
        if (!frame) throw new Error(`Frame with URL containing '${urlContains}' not found`);
        return frame;
    }

    static async switchToFrame(page: Page, frameName: string): Promise<Frame> {
        const frame = page.frame({ name: frameName });
        if (!frame) throw new Error(`Frame '${frameName}' not found`);
        return frame;
    }


    // ============================================
    // 4. VISUAL COMPARISON
    // ============================================
    static async compareScreenshot(page: Page, name: string) {
        await expect(page).toHaveScreenshot(`${name}.png`, {
            fullPage: true,
            maxDiffPixelRatio: 0.02
        });
    }
}

//Next task:
//excel util
//scenario outline, datatable, exel passing in bdd
//json file write from admin module