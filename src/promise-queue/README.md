# PromiseQueue

Executes promises sequentially, one at a time.

## Usage

```js
import {PromiseQueue} from "./PromiseQueue.js"

const queue = new PromiseQueue()

queue.enqueue(() => fetch("/api/first"))
queue.enqueue(() => fetch("/api/second"))  // waits for first to complete
queue.enqueue(() => fetch("/api/third"))   // waits for second to complete
```

Each item must be a function that returns a promise. `enqueue()` itself returns a promise that resolves with the result of the enqueued function.

## Methods

- `enqueue(promiseFunction)` — add a promise-returning function to the queue. Returns a `Promise` that resolves when the function completes
- `destroy()` — stop processing and clear the queue
