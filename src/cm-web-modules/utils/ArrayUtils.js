/**
 * Author: shaack
 */
export class ArrayUtils {
    static pushAll(fromArray, toArray) {
        for (let obj of fromArray) {
            toArray.push(obj);
        }
    }
    static unshiftAll(fromArray, toArray) {
        for (let obj of fromArray) {
            toArray.unshift(obj);
        }
    }
}