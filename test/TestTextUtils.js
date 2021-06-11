/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {TextUtils} from "../src/cm-web-modules/utils/TextUtils.js"

describe("TextUtils", () => {
    it("should crop a text", () => {
        const longText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        assert.equal(TextUtils.crop(longText, 10), "Lorem ipsu…")
    })
    it("shouldEscapeHtml", () => {
        const raw = "<script>window.alert('Hello')</script>&\"'"
        assert.equal(TextUtils.escapeHtml(raw), "&lt;script&gt;window.alert(&#39;Hello&#39;)&lt;/script&gt;&amp;&quot;&#39;")
    })
    it("shouldNl2br", () => {
        const raw = `Das
ist
ein Test.`
        console.log(TextUtils.nl2br(raw))
        assert.equal(TextUtils.nl2br(raw), `Das<br/>ist<br/>ein Test.`)
    })
})