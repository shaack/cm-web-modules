# Cache

Simple in-memory key-value cache with optional periodic auto-clearing.

## Usage

```js
import {Cache} from "./Cache.js"

const cache = new Cache({clearInterval: 30000})

cache.put("user", {name: "Alice"})
cache.get("user")    // {name: "Alice"}
cache.clear("user")  // remove single entry
cache.clearAll()     // remove all entries
```

## Constructor props

| Prop | Default | Description |
|------|---------|-------------|
| `clearInterval` | `30000` | Auto-clear interval in ms. Set to `0` to disable |

## Methods

- `put(key, value)` — store a value
- `get(key)` — retrieve a value
- `clear(key)` — remove a single entry
- `clearAll()` — remove all entries
