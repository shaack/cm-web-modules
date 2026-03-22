# Observed

Proxy-based reactive property observation. The preferred approach for reactive state in cm-web-modules.

## Usage

```js
import {Observed} from "./Observed.js"

const state = new Observed({name: "Alice", score: 0})

state.addObserver((event) => {
    console.log(`${event.property}: ${event.oldValue} → ${event.value}`)
})

state.score = 10  // logs: "score: 0 → 10"
```

### Observe specific properties

```js
state.addObserver((event) => {
    console.log("score changed:", event.value)
}, ["score"])
```

The properties parameter accepts a string or an array of strings.

## Observer callback event

| Property | Description |
|----------|-------------|
| `target` | The observed object |
| `property` | Name of the changed property |
| `value` | New value |
| `oldValue` | Previous value |

## Methods on the observed object

- `addObserver(callback, properties)` — register an observer. `properties` (optional) filters which properties trigger the callback
- `removeObserver(callback, properties)` — remove an observer
- `makeDirty(property)` — manually trigger observers as if `property` changed. If `property` is omitted, triggers all observers.
