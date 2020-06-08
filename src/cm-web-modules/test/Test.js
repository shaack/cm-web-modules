/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

const DEFAULT_MESSAGE = "Assertion failed"
const STYLE = "font-family: sans-serif"

class TestError extends Error {
    constructor(message) {
        super(message)
    }
}

export class Test {
    constructor(config) {
        this.config = {
            htmlOutput: true,
            consoleOutput: true,
            tests: null
        }
        Object.assign(this.config, config)
        if (this.config.htmlOutput) {
            const testHeadline = document.createElement("h2")
            testHeadline.setAttribute("style", STYLE)
            testHeadline.innerText = this.constructor.name
            document.body.appendChild(testHeadline)
        }
        if (this.config.consoleOutput) {
            console.log("# " + this.constructor.name)
        }
        let functionNames = []
        // find out test functions
        if (this.config.tests) {
            if (Array.isArray(this.config.tests)) {
                functionNames = this.config.tests
            } else {
                functionNames.push(this.config.tests)
            }
        } else {
            functionNames = Object.getOwnPropertyNames(this.constructor.prototype)
        }

        functionNames.forEach((functionName) => {
            let failed = false
            const testList = document.createElement("div")
            testList.setAttribute("style", STYLE)
            if (functionName.substr(0, 4) === "test") {
                if (this.config.consoleOutput) {
                    console.log("## " + functionName)
                }
                testList.innerHTML += functionName
                try {
                    this[functionName]()
                } catch (e) {
                    testList.innerHTML += " =&gt; <span style='color: #990000;'>Fail</span>"
                    testList.innerHTML += "<pre style='color: #990000; background-color: #f2f2f2; padding: 5px'>" + e + "</pre>"
                    console.error(e)
                    failed = true
                }
                if (!failed) {
                    testList.innerHTML += " =&gt; <span style='color: #009900;'>OK</span>"
                }
                if (this.config.htmlOutput) {
                    document.body.appendChild(testList)
                }
            }
        })
    }

    static assert(condition, message = DEFAULT_MESSAGE) {
        if (!condition) {
            throw new TestError(message)
        }
    }

    static assertEquals(expected, value, message = DEFAULT_MESSAGE) {
        if (expected !== value) {
            throw new TestError(message + " – expected: " + expected + ", result: " + value)
        }
    }

    static run(functionNameToTest = null) {
        new this(functionNameToTest)
    }
}