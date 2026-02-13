# Observed

Proxy-based observation for reactive JavaScript objects. Wraps any object or array in a `Proxy` that notifies registered observers whenever a property is set.

`Observed` is the modern replacement for the older `Observe` class, which used `Object.defineProperty` getter/setter overrides. `Observed` uses ES6 `Proxy` instead, providing cleaner semantics and automatic coverage of all property sets — including array mutations like `push`, `pop`, `splice`, and direct index assignment.

## Import

```js
import {Observed} from "cm-web-modules/src/observed/Observed.js"
```

## Usage

### Creating an observed object

Call `new Observed(target)` with any object or array. The returned value is a `Proxy` — use it in place of the original target.

```js
const state = new Observed({
    count: 0,
    name: "Alice"
})
```

### Registering observers

The proxy exposes an `addObserver` method directly on the observed object.

```js
state.addObserver((event) => {
    console.log(event.property, "changed from", event.oldValue, "to", event.value)
})
```

Setting any property triggers all matching observers:

```js
state.count = 1
// logs: "count changed from 0 to 1"

state.name = "Bob"
// logs: "name changed from Alice to Bob"
```

### Filtering by property name

Pass a property name or array of property names to only be notified about specific properties.

```js
// Single property — string
state.addObserver((event) => {
    console.log("count is now", event.value)
}, "count")

// Multiple properties — array
state.addObserver((event) => {
    console.log(event.property, "changed")
}, ["count", "name"])
```

When no properties are specified (or an empty array is passed), the observer is called for every property change.

### Removing observers

Pass the same callback reference to `removeObserver`.

```js
function onCountChange(event) {
    console.log(event.value)
}

state.addObserver(onCountChange, "count")
state.removeObserver(onCountChange)
```

## Observer callback event

The callback receives a single event object with these fields:

| Field      | Description                              |
|------------|------------------------------------------|
| `target`   | The underlying (unwrapped) target object |
| `property` | Name of the property that was set        |
| `value`    | The new value                            |
| `oldValue` | The previous value                       |

## Observing arrays

Arrays work the same way. Mutating methods like `push`, `pop`, `splice`, `shift`, and `unshift` trigger observers because they internally set indexed properties and `length`.

```js
const list = new Observed([])

list.addObserver((event) => {
    console.log("list changed:", event.property, event.value)
})

list.push("first")   // observer fires (property "0", then "length")
list.push("second")  // observer fires
list[0] = "replaced" // observer fires (property "0")
list.pop()           // observer fires
list.splice(0)       // observer fires
```

## Nested observation

`Observed` only intercepts property sets on the immediate proxy. For nested reactive objects, wrap inner values with `Observed` as well.

```js
const state = new Observed({
    count: 0,
    items: new Observed([])
})

// Observe changes to top-level properties (count, items reference)
state.addObserver((event) => {
    console.log("state changed:", event.property)
})

// Observe mutations within the items array
state.items.addObserver((event) => {
    console.log("items changed:", event.property, event.value)
})

state.items.push("new item") // triggers items observer, not state observer
state.count = 1              // triggers state observer
```

## Observing class instances

Class instances can be wrapped. Methods that assign to `this` properties will trigger observers since `this` refers to the proxy.

```js
class Counter {
    constructor() {
        this.value = 0
    }
    increment() {
        this.value++
    }
}

const counter = new Observed(new Counter())

counter.addObserver((event) => {
    console.log("counter.value =", event.value)
})

counter.increment() // logs: "counter.value = 1"
counter.value = 10  // logs: "counter.value = 10"
```

Note: changes to properties of nested plain objects (e.g. `counter.inner.x = 1`) will **not** trigger the outer observer. Wrap inner objects with `Observed` if you need deep reactivity.

## Full example: Todo app

From `examples/todo-app-observed/` — a reactive todo list using `Observed` with `Component`.

**App setup** — observed array as shared state:

```js
import {Component} from "cm-web-modules/src/app/Component.js"
import {Observed} from "cm-web-modules/src/observed/Observed.js"

export class ToDoApp extends Component {
    constructor(context) {
        super({}, {
            todos: new Observed([])
        })
        new InputComponent(context.querySelector(".InputComponent"), this.state)
        new ListOutputComponent(context.querySelector(".ListOutputComponent"), this.state)
    }
}
```

**Adding items** — mutations trigger observers automatically:

```js
this.state.todos.unshift(new ToDo(inputValue))
```

**Rendering on change** — observer re-renders the list:

```js
this.state.todos.addObserver(() => {
    let html = ""
    for (const value of this.state.todos) {
        html += `<li><label><input data-id="${value.id}" type="checkbox"
            ${value.done ? "checked" : ""} />${value.text}</label></li>`
    }
    this.context.innerHTML = html
})
```

## API reference

### `new Observed(target)`

- **target**: `Object | Array` — the object or array to observe
- **Returns**: `Proxy` — a proxy wrapping the target, with `addObserver` and `removeObserver` methods added

### `proxy.addObserver(callback, properties?)`

Register an observer.

- **callback**: `Function(event)` — called when a matching property is set
- **properties**: `string | string[]` (optional, default `[]`) — property name(s) to filter on. Empty array or omitted means observe all properties.
- **Throws**: `Error` if `properties` is not a string or array

### `proxy.removeObserver(callback, properties?)`

Remove a previously registered observer.

- **callback**: `Function` — the same function reference passed to `addObserver`
- **properties**: `string[]` (optional, default `[]`) — if provided, only removes the observer registered with matching properties

### `proxy.makeDirty(property?)`

Manually trigger observers without assigning a new value. Useful when a property's internal state was mutated (e.g. calling a method on it) without reassigning the property itself.

- **property**: `string` (optional) — the property name to mark dirty. If omitted, all observers are called.

The callback event will have `value` and `oldValue` set to the same current value.

```js
const state = new Observed({
    fen: new Fen()
})

state.addObserver((event) => {
    console.log("fen updated")
}, "fen")

// Instead of this workaround:
//   state.fen.parse(e.target.value)
//   state.fen = state.fen

// Use makeDirty:
state.fen.parse(e.target.value)
state.makeDirty("fen")
```

When called without arguments, all observers are notified regardless of their property filter:

```js
state.makeDirty() // notifies all observers
```

## Comparison with Observe

| Feature               | `Observe` (legacy)                                    | `Observed`                                                  |
|-----------------------|-------------------------------------------------------|-------------------------------------------------------------|
| Mechanism             | `Object.defineProperty` getter/setter                 | ES6 `Proxy`                                                 |
| Setup                 | `Observe.property(obj, "name", cb)` per property      | `new Observed(obj)` wraps entire object                     |
| Scope                 | Explicit per-property registration                    | All property sets intercepted automatically                 |
| Collections           | Explicit mutation method patching for Array/Set/Map   | Array mutations work via Proxy (sets on indices and length) |
| Cleanup               | `observer.remove()`                                   | `proxy.removeObserver(cb)`                                  |
| Function interception | `preFunction` / `postFunction`                        | Not supported (use `Observe` if needed)                     |
