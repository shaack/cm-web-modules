/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class Notifications {

    requestPermission() {
        Notification.requestPermission((permission) => {
            console.log(permission)
        })
    }

    show(title, body) {
        new Notification(title, {body: body});
    }
}

