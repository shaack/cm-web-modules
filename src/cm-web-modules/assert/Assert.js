/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

const DEFAULT_MESSAGE = "Assertion failed"

class TestError extends Error {
    constructor(message) {
        super(message)
        console.error(this)
    }
}

export class Assert {

    static true(condition, message = DEFAULT_MESSAGE) {
        if (!condition) {
            throw new TestError(message)
        }
    }

    static equals(value, expected, message = DEFAULT_MESSAGE) {
        if (expected !== value) {
            throw new TestError(message + " – expected: " + expected + ", result: " + value)
        }
    }

}