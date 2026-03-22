# Md5

Pure JavaScript MD5 hash implementation with no dependencies.

## Usage

```js
import {Md5} from "./Md5.js"

Md5.hash("hello")  // "5d41402abc4b2a76b9719d911017c592"
```

## Static methods

- `Md5.hash(string)` — returns the MD5 hash of the input string as a hexadecimal string. Supports full Unicode including surrogate pairs.
