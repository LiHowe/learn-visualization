import { BasicGraph } from './Common'

/**
 * 圆弧
 */
export default class HArc implements BasicGraph {
    context: CanvasRenderingContext2D

    constructor(opt: Object, ctx: CanvasRenderingContext2D) {
        this.context = ctx
    }

    draw() {

    }
}