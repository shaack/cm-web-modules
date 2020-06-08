/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-test
 * License: MIT, see file 'LICENSE'
 */

import {ES5Utils} from "../../src/cm-web-modules/utils/ES5Utils.js"
import {Test} from "../../src/cm-web-modules/test/Test.js"

export class TestES5Utils extends Test {

    testLoadScript() {
        ES5Utils.loadScript("./mockups/es5.js").then(() => {
            Test.assertEquals("test value", es5Variable)
        })
    }

}