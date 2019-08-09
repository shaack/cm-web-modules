/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-message-broker
 * License: MIT, see file 'LICENSE'
 */
import {MessageBroker} from "../src/wm/message-broker/MessageBroker.js"
import assert from 'assert';

describe("MessageBroker", function() {

    it("should allow subscription for a topic", function (done) {
        const messageBroker = new MessageBroker()
        const subscriber = function() {
        }
        messageBroker.subscribe("test1", subscriber)
        assert.equal(messageBroker.topics["test1"][0], subscriber)
        done()
    })

    it("should publish a message to a subscriber", function (done) {
        const messageBroker = new MessageBroker()
        const testMessage = function testMessage() {
        }
        const subscriber = function(message) {
            assert.equal(message.constructor, testMessage)
            done()
        }
        messageBroker.subscribe(testMessage, subscriber)
        assert.equal(messageBroker.topics[testMessage][0], subscriber)
        messageBroker.publish(new testMessage())
    })

    it("sould publis a message with data to a subscriber", function(done) {
        const messageBroker = new MessageBroker()

        const testMessage = function testMessage(data) {
            // noinspection JSUnusedGlobalSymbols
            this.data = data
        }
        const subscriber = function(message) {
            assert.equal("Hello", message.data)
            done()
        }

        messageBroker.subscribe(testMessage, subscriber)
        assert.equal(messageBroker.topics[testMessage][0], subscriber)
        messageBroker.publish(new testMessage("Hello"))
    })

    it("should subscribe multiple subscribers and unsubscribe one for a topic", function (done) {
        const messageBroker = new MessageBroker()

        const testMessage1 = function testMessage1(data) {
            // noinspection JSUnusedGlobalSymbols
            this.data = data
        }
        const testMessage2 = function testMessage2() {
        }

        const subscriber1 = function() {
            assert.fail()
        }
        const subscriber2 = function(message) {
            assert.equal("Hello", message.data)
            done()
        }
        const subscriber3 = function() {
            assert.fail()
        }

        messageBroker.subscribe(testMessage1, subscriber1)
        messageBroker.subscribe(testMessage1, subscriber2)
        messageBroker.subscribe(testMessage2, subscriber3)
        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(2, messageBroker.topics[testMessage1].length)
        assert.equal(1, messageBroker.topics[testMessage2].length)

        messageBroker.unsubscribe(testMessage1, subscriber1)

        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics[testMessage1].length)
        assert.equal(1, messageBroker.topics[testMessage2].length)

        assert.equal(messageBroker.topics[testMessage1][0], subscriber2)
        assert.equal(messageBroker.topics[testMessage2][0], subscriber3)

        messageBroker.publish(new testMessage1("Hello"))
    })

    it("should unsubscribe all callbacks for a topic", function(done) {
        const messageBroker = new MessageBroker()

        const testMessage1 = function testMessage1() {
        }
        const testMessage2 = function testMessage2() {
        }

        const subscriber1 = function() {
            assert.fail()
        }
        const subscriber2 = function() {
            assert.fail()
        }
        const subscriber3 = function() {
            done()
        }

        messageBroker.subscribe(testMessage1, subscriber1)
        messageBroker.subscribe(testMessage1, subscriber2)
        messageBroker.subscribe(testMessage2, subscriber3)

        messageBroker.unsubscribe(testMessage1)

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(undefined, messageBroker.topics[testMessage1])
        assert.equal(1, messageBroker.topics[testMessage2].length)

        assert.equal(messageBroker.topics[testMessage2][0], subscriber3)

        messageBroker.publish(new testMessage1())
        messageBroker.publish(new testMessage2())
    })

    it("should unsubscribe all topics for a callback", function(done) {
        const messageBroker = new MessageBroker()

        const testMessage1 = function testMessage1() {
        }
        const testMessage2 = function testMessage2() {
        }

        const subscriber1 = function() {
            assert.fail()
        }
        const subscriber2 = function() {
            done()
        }

        messageBroker.subscribe(testMessage1, subscriber1)
        messageBroker.subscribe(testMessage1, subscriber2)
        messageBroker.subscribe(testMessage2, subscriber1)

        messageBroker.unsubscribe(null, subscriber1)

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics[testMessage1].length)
        assert.equal(undefined, messageBroker.topics[testMessage2])

        assert.equal(messageBroker.topics[testMessage1][0], subscriber2)

        messageBroker.publish(new testMessage1())
        messageBroker.publish(new testMessage2())
    })

})