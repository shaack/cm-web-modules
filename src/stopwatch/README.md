# Stopwatch

Timer with start, stop, reset, and tick callbacks.

## Usage

```js
import {Stopwatch} from "./Stopwatch.js"

const stopwatch = new Stopwatch({
    onStateChanged: (running) => {
        console.log("Running:", running)
    },
    onTimeChanged: (seconds) => {
        console.log("Time:", seconds.toFixed(1))
    }
})

stopwatch.start()
stopwatch.stop()
stopwatch.reset()
```

## Constructor props

| Prop | Default | Description |
|------|---------|-------------|
| `onStateChanged` | `() => {}` | Called on start and stop with `running` boolean |
| `onTimeChanged` | `() => {}` | Called every tick with elapsed seconds |
| `tickResolution` | `100` | Tick interval in milliseconds |

## Methods

- `start()` — start or resume the stopwatch
- `stop()` — pause the stopwatch
- `reset()` — reset elapsed time to zero
- `secondsExpired()` — returns total elapsed seconds
- `running()` — returns `true` if running
