import { BasicGraph } from './Common'
import { LinearGradient, RadialGradient } from '../Gradient'

export type RectOption = {
    position: [number, number],
    size: [number, number],
    style?: {
        stroke?: {
            background?: string | LinearGradient | RadialGradient,
            width?: number
        },
        fill?: {
            background?: string | LinearGradient | RadialGradient,
        },
        radius?: [number, number, number, number] | number, // 曲度:  [上,右,下,左] | 一样的曲度
    }
}

/**
 * 矩形
 */
export default class HRect implements BasicGraph {

    context: CanvasRenderingContext2D

    options: RectOption

    constructor(opt: RectOption, ctx: CanvasRenderingContext2D) {
        this.context = ctx
        this.options = opt
    }

    draw() {
        const { position: [x, y], size: [width, height] } = this.options
        const { style } = this.options
        if (style?.stroke) {
            this.context.strokeRect(x, y, width, height)
        }
        if (style?.fill) {
            this.context.fillRect(x, y, width, height)
        }
    }

    private drawRoundRect() {
        
    }
}