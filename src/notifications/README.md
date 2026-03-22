# Notifications

Wrapper for the Web Notifications API.

## Usage

```js
import {Notifications} from "./Notifications.js"

const notifications = new Notifications()
notifications.requestPermission()
notifications.show("Title", "Message body")
```

## Methods

- `requestPermission()` — request notification permission from the user
- `show(title, body)` — display a notification
