import HRect, { RectOption } from './graphs/Rect'

type CanvasInitOption = { target: HTMLElement, size?: { width: number, height: number } }

export default class BasicCanvas {

    container:          null | HTMLDivElement           = null
    canvas:             null | HTMLCanvasElement        = null
    context:            null | CanvasRenderingContext2D = null
    assistedCanvas:     null | HTMLCanvasElement        = null
    assistedContext:    null | CanvasRenderingContext2D = null
    option: CanvasInitOption
    size: { width: number, height: number } = { width: 500, height: 300 }

    _grid: boolean = false
    
    constructor({ target, size }: CanvasInitOption) {
        if (size) this.size = size
        if (!target)
            throw new Error('selector can not be null.')
        const { offsetHeight: height, offsetWidth: width } = target

        const container = document.createElement('div')
        container.id = target.id
        container.style.width = width + 'px'
        container.style.height = height + 'px'
        container.style.position = 'relative'

        const canvas = this._generateCanvasEl(this.size)
        container.appendChild(canvas)
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.container = container

        target.replaceWith(container)
        this.option = { target, size }
    }

    private _generateCanvasEl({ width, height }: { width: number, height: number }) {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', String(width))
        canvas.setAttribute('height', String(height))
        canvas.style.position = 'absolute'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.zIndex = '1'
        return canvas
    }

    destroy() {
        this.canvas = null
    }

    /**
     * 画矩形
     * @param opt 
     * @param ctx 
     */
    drawRect(opt: RectOption, ctx?: CanvasRenderingContext2D): BasicCanvas {
        const c = ctx || this.context
        if (!c)
            throw new Error('Canvas context is not exist.')
        const square = new HRect(opt, c)
        square.draw()
        return this
    }

    toggleGrid() {
        if (!this._grid) {
            if (this.assistedCanvas) {
                this.assistedCanvas.style.display = 'block'
            } else {
                const assistedCanvas = this._generateCanvasEl(this.size)
                assistedCanvas.style.zIndex = '0'
                this.container?.appendChild(assistedCanvas)
                this.assistedCanvas = assistedCanvas
                this.assistedContext = this.assistedCanvas.getContext('2d')
                this.drawGrid({ ctx: this.assistedContext })
            }
        } else {
            this.assistedCanvas!.style.display = 'none'
        }
        this._grid = !this._grid
    }

    /**
     * 画网格线
     * @param step 
     * @param color 
     * @param lineWidth 
     */
    drawGrid({ step = 10, color = 'lightgray', lineWidth = 0.5, ctx } : {step?: number, color?: string, lineWidth?: number, ctx?: CanvasRenderingContext2D | null }) {
        if (!this.canvas || !this.context) return
        if (!ctx) ctx = this.context
        for (let i = 0; i <= this.canvas.width; i+=step) {
            ctx.moveTo(i, 0)
            ctx.lineTo(i, this.canvas.height)
        }
        for (let i = 0; i <= this.canvas.height; i+=step) {
            ctx.moveTo(0, i)
            ctx.lineTo(this.canvas.width, i)
        }
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.stroke()
        ctx.beginPath()
    }
}
