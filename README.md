# cm-web-modules

Zero-dependency ES6 module library for web development, used in production at [chessmail.de](https://www.chessmail.de).

Provides needed functionality with the smallest and cleanest amount of code possible. No build step required — modules are native ES6 imports used directly in browsers.

## Installation

```bash
npm install cm-web-modules
```

## Modules

| Module | Description |
|--------|-------------|
| [Audio](src/audio/) | Web Audio API playback with gain control, looping, and audio sprites |
| [Cache](src/cache/) | Simple in-memory key-value cache with auto-clearing |
| [Component](src/app/) | Base classes for components with props, state, and declarative event binding |
| [Cookie](src/cookie/) | Read, write, and delete browser cookies |
| [I18n](src/i18n/) | Internationalization with fallback languages and placeholder substitution |
| [Md5](src/md5/) | Pure JavaScript MD5 hash implementation |
| [MessageBroker](src/message-broker/) | Pub/Sub messaging with wildcard topic support |
| [Notifications](src/notifications/) | Web Notifications API wrapper |
| [Observed](src/observed/) | Proxy-based reactive property observation |
| [PromiseQueue](src/promise-queue/) | Sequential promise execution queue |
| [Stopwatch](src/stopwatch/) | Timer with start, stop, reset, and tick callbacks |
| [Svg](src/svg/) | SVG DOM creation and manipulation |
| [Template](src/template/) | Simple `${key}` template rendering |
| [Utils](src/utils/) | ArrayUtils, ColorUtils, CoreUtils, DateUtils, DomUtils, EncryptionUtils, HttpUtils, TextUtils |

## Usage

Import modules individually — there is no barrel export or bundling:

```js
import {Audio} from "cm-web-modules/src/audio/Audio.js"
import {Sample} from "cm-web-modules/src/audio/Sample.js"
import {Observed} from "cm-web-modules/src/observed/Observed.js"
```

## Testing

Browser-based only — open `test/index.html` in a browser. There is no CLI test runner.

## License

MIT
