# Cookie

Read, write, and delete browser cookies. Uses `Path=/; SameSite=Strict` by default.

## Usage

```js
import {Cookie, DURATION} from "./Cookie.js"

Cookie.write("theme", "dark", DURATION.year)
Cookie.read("theme")   // "dark"
Cookie.delete("theme")
```

## Static methods

- `Cookie.write(name, value, maxAge)` — write a cookie. `maxAge` is in seconds (optional)
- `Cookie.read(name)` — read a cookie value, returns `undefined` if not found
- `Cookie.delete(name)` — delete a cookie

## DURATION constants

| Constant | Seconds |
|----------|---------|
| `DURATION.second` | `1` |
| `DURATION.minute` | `60` |
| `DURATION.hour` | `3600` |
| `DURATION.day` | `86400` |
| `DURATION.week` | `604800` |
| `DURATION.year` | `31536000` |
