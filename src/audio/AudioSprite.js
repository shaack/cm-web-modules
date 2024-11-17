/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

import {Sample} from "./Sample.js"

export class AudioSprite extends Sample {

    // noinspection JSCheckFunctionSignatures
    play(sliceName, when = 0) {
        this.playSlice(sliceName, when)
    }

    playSlice(sliceName, when = 0) {
        const slice = this.props.slices[sliceName]
        if (!slice) {
            throw new Error(`slice ${sliceName} not found in sprite`)
        }
        super.play(when, slice.offset, slice.duration)
    }

}
