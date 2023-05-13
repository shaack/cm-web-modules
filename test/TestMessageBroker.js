/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "../node_modules/teevi/src/teevi.js"
import {MessageBroker} from "../src/message-broker/MessageBroker.js"

describe("MessageBroker", function () {

    it("should allow subscription for a topic", function () {
        const messageBroker = new MessageBroker()
        const callback = function () {
        }
        messageBroker.subscribe("test1", callback)
        assert.equal(messageBroker.topics["test1"][0], callback)
    })

    it("should publish a text message to a subscriber", function () {
        const messageBroker = new MessageBroker()
        const topic = "test/topic/"
        const testMessage = "Hello World!"
        const subscriber = function (message) {
            assert.equal(message, testMessage)
            // done()
        }
        messageBroker.subscribe(topic, subscriber)
        assert.equal(messageBroker.topics[topic][0], subscriber)
        messageBroker.publish(topic, testMessage)
    })

    it("should publish a message with an object as data to a subscriber", function () {
        const messageBroker = new MessageBroker()

        const topic = "test/topic"
        const testMessage = {
            name: "Peter",
            age: 33
        }
        const subscriber1 = function (message) {
            assert.equal("Peter", message.name)
            assert.equal(33, message.age)
            // done()
        }
        const subscriber2 = function () {
            Assert.fail()
            // done()
        }

        messageBroker.subscribe(topic, subscriber1)
        messageBroker.subscribe("false/topic", subscriber2)
        assert.equal(messageBroker.topics[topic][0], subscriber1)
        messageBroker.publish(topic, testMessage)
    })

    it("should subscribe to a topic with wildcard", function () {
        const messageBroker = new MessageBroker()
        messageBroker.subscribe("test/#", function(data, topic) {
            assert.equal(data, "thedata")
            assert.equal(topic, "test/the/wildcard")
            // done()
        })
        messageBroker.publish("test/the/wildcard", "thedata")
    })

    it("should subscribe to all topics with wildcard #", function () {
        const messageBroker = new MessageBroker()
        messageBroker.subscribe("#", function() {
            // done()
        })
        messageBroker.publish("test/the/wildcard/more")
    })

    it("should subscribe multiple subscribers and unsubscribe one for a topic", function () {
        const messageBroker = new MessageBroker()

        const topic1 = "topic/correct"
        const topic2 = "topic/false"
        const testMessage1 = {
            // noinspection JSUnusedGlobalSymbols
            data: "Hello"
        }

        const subscriber1 = function () {
            Assert.fail()
        }
        const subscriber2 = function (message) {
            assert.equal("Hello", message.data)
            // done()
        }
        const subscriber3 = function () {
            Assert.fail()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber3)
        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(2, messageBroker.topics[topic1].length)
        assert.equal(1, messageBroker.topics[topic2].length)

        messageBroker.unsubscribe(topic1, subscriber1)

        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics[topic1].length)
        assert.equal(1, messageBroker.topics[topic2].length)

        assert.equal(messageBroker.topics[topic1][0], subscriber2)
        assert.equal(messageBroker.topics[topic2][0], subscriber3)

        messageBroker.publish(topic1, testMessage1)
    })

    it("should unsubscribe all callbacks for a topic", function () {
        const messageBroker = new MessageBroker()

        const topic1 = "test/topic1"
        const topic2 = "test/topic2"

        const subscriber1 = function () {
            Assert.fail()
        }
        const subscriber2 = function () {
            Assert.fail()
        }
        const subscriber3 = function () {
            // done()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber3)

        messageBroker.unsubscribe(topic1)

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(undefined, messageBroker.topics[topic1])
        assert.equal(1, messageBroker.topics[topic2].length)

        assert.equal(messageBroker.topics[topic2][0], subscriber3)

        messageBroker.publish(topic1)
        messageBroker.publish(topic2)
    })

    it("should unsubscribe all topics for a callback", function () {
        const messageBroker = new MessageBroker()

        const topic1 = "test/topic1"
        const topic2 = "test/topic2"

        const subscriber1 = function () {
            Assert.fail()
        }
        const subscriber2 = function () {
            //done()
        }

        messageBroker.subscribe(topic1, subscriber1)
        messageBroker.subscribe(topic1, subscriber2)
        messageBroker.subscribe(topic2, subscriber1)

        messageBroker.unsubscribe(null, subscriber1)

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics[topic1].length)
        assert.equal(undefined, messageBroker.topics[topic2])

        assert.equal(messageBroker.topics[topic1][0], subscriber2)

        messageBroker.publish(topic1)
        messageBroker.publish(topic2)
    })


})
