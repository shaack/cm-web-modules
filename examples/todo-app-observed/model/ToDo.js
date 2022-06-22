let id = 1

export class ToDo {
    constructor(text) {
        this.id = id++
        this.text = text
        this.done = false
    }
}