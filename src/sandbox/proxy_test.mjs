import {ObservedProxy} from "../cm-web-modules/observed/ObservedProxy.mjs"

const state = new ObservedProxy({
    number: 100,
    string: "Hello",
}, {
    set(obj, prop, value) {
        console.log("set", prop, value)
    },
    get(target, prop, receiver) {
        console.log("set", prop)
        return Reflect.get(...arguments);
    }
})

state.number = 200

