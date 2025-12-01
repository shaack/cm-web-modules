/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class Notifications {

    requestPermission() {
        Notification.requestPermission((permission) => {
            console.log(permission)
        }).then(() => console.log("Permission granted"))
    }

    show(title, body) {
        new Notification(title, {body: body});
    }

}

