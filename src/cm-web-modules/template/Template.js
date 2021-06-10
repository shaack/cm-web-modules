/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2021-06-09
 */

export class Template {
    constructor(template) {
        this.template = template
    }

    render(replacements) {
        return this.template.replace(/\${(.*?)}/g, (toReplace, key) => {
            if(replacements[key] === undefined) {
                return toReplace
            } else {
                return replacements[key]
            }
        })
    }
}
