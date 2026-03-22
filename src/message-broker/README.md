# MessageBroker

Topic-based Pub/Sub messaging with wildcard support.

## Usage

```js
import {MessageBroker} from "./MessageBroker.js"

const broker = new MessageBroker()

broker.subscribe("game/move", (data, topic) => {
    console.log(topic, data)
})

broker.publish("game/move", {from: "e2", to: "e4"})
```

## Wildcard topics

Use `#` to subscribe to all topics within a hierarchy:

```js
broker.subscribe("#", callback)           // all topics
broker.subscribe("game/#", callback)      // all topics starting with "game/"
```

Topics use `/` as separator: `"game/move"`, `"game/end"`, `"chat/message"`.

## Methods

- `subscribe(topic, callback)` — subscribe to a topic
- `unsubscribe(topic, callback)` — unsubscribe. Both parameters are optional:
  - `(topic, callback)` — remove specific callback from topic
  - `(topic)` — remove all callbacks from topic
  - `(null, callback)` — remove callback from all topics
  - `()` — remove all subscriptions
- `publish(topic, object, async)` — publish to a topic. `async` defaults to `true` (callbacks run via `setTimeout`). Set to `false` for synchronous delivery.
