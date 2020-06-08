# cm-web-modules – Library of ES6 Web Modules

`cm-web-modules` is a library of JavaScript ES6 (ECMAScript 6) modules, used for coding [chessmail](http://www.chessmail.eu).

The main purpose of `cm-web-modules` is, to prevent the usage of large libraries, and to provide needed functionality with the smallest and cleanest amount of code possible.

The `cm-web-modules` modules have no external dependencies, they don't use jQuery or other frameworks. They are written with modern vanilla JavaScript in ECMAScript 6 syntax.

The `cm-web-modules` modules are:

- [App](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/app) Kind of minimal framework for ES6 JS apps.
- [Audio](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/audio) Module for the [Web Audio API](https://developer.mozilla.org/de/docs/Web/API/Web_Audio_API). For playing audio samples in a web page.
- [Cache](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/cache)
- [i18n](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/i18n)
- [MessageBroker](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/message-broker)
- [Observe](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/observe) Module to observe object properties used for reactive coding the simple way.
- [Stopwatch](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/stopwatch)
- [SVG](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/svg) Module to render SVG elements and load sprites.
- [Utils](https://github.com/shaack/cm-web-modules/tree/master/src/cm-web-modules/utils)

## LibraryManager

The LibraryManager is the glue between the web-modules. 

It in configured in `postinstall.js`. Add `postinstall.js` to the automtically excuted install-scripts from npm by adding it to `package.json` like this

`package.json`
```json
"scripts": {
    "test": "mocha --require babel-core/register ./test/*.js",
    "postinstall": "node postinstall.js"
  }
```

In `postinstall.js`, add the used modules via `manager.addProject("module-name")`

The source of the module is than copied to `PROJECT_ROOT/lib/modules/name`. It provides
the same include-folder (/lib) for the local and for the via npm installed modules.

You must call `npm install` after every `npm update`, because it is only automatically started by
the initial install.  

Example `postinstall.js`
```js
const LibraryManager = require("cm-web-modules/src/LibraryManager.js")
const manager = new LibraryManager(__dirname)

manager.addProject("cm-web-modules")
manager.addProject("chess.js", "", "chess.js")
```