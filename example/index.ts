import HCanvas from '../src/index'
const container = document.createElement('div')
container.style.width = '500px'
container.style.height = '300px'
document.body.appendChild(container)
const c = new HCanvas({
    target: container,
    size: {
        width: 500,
        height: 300
    }
})

c.drawRect({
    position: [10, 10],
    size: [40, 50],
    style: {
        stroke: {
            background: '#00a001'
        }
    }
})

const btn = document.createElement('button')
btn.innerText = '网格'
btn.onclick = (e) => {
    c.toggleGrid()
}
document.body.appendChild(btn)