# Component

Base classes for building components with props, state, and declarative event binding.

## Component

Minimal base class with `props` and `state`.

```js
import {Component} from "./Component.js"

class MyComponent extends Component {
    constructor() {
        super(
            {color: "red"},    // props
            {count: 0}        // state
        )
    }
}
```

## UiComponent

Extends `Component` with a DOM `context` element and an `actions` object for declarative event binding.

```js
import {UiComponent} from "./Component.js"

class Counter extends UiComponent {
    constructor(element) {
        super(element, {debug: false}, {count: 0})
        this.actions = {
            increment: () => { this.state.count++ }
        }
        this.addDataEventListeners()
    }
}
```

### Declarative event binding

Use HTML `data-*` attributes to bind events to actions:

```html
<div id="counter">
    <button data-event-listener="click" data-action="increment">+1</button>
</div>
```

#### Supported attributes

| Attribute | Description |
|-----------|-------------|
| `data-event-listener` | The DOM event name (`click`, `change`, etc.) |
| `data-action` | The action name in `this.actions` to call |
| `data-delegate` | Optional CSS selector to delegate the event from a child element |

Call `this.addDataEventListeners()` after setting up `this.actions` to activate the bindings.
