export const getContext = (x: number, y: number) => {
  const root = document.getElementById('root') as HTMLElement
  const canvas = document.createElement('canvas')
  canvas.width = x
  canvas.height = y
  root.appendChild(canvas)
  return canvas.getContext('2d') as CanvasRenderingContext2D
}

export const drawTriangle = (props: {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  size: number
  color: string
  direction: 'up' | 'down' | 'left' | 'right'
  sizeMod: 2 | 3 | 4 | 5
}) => {
  const { ctx, x, y, size, direction, color, sizeMod } = props
  const centerX = x * size + size / 2
  const centerY = y * size + size / 2
  ctx.beginPath()
  if (direction === 'up') {
    ctx.moveTo(centerX, centerY - size / sizeMod)
    ctx.lineTo(centerX - size / sizeMod, centerY + size / sizeMod)
    ctx.lineTo(centerX + size / sizeMod, centerY + size / sizeMod)
  } else if (direction === 'down') {
    ctx.moveTo(centerX, centerY + size / sizeMod)
    ctx.lineTo(centerX - size / sizeMod, centerY - size / sizeMod)
    ctx.lineTo(centerX + size / sizeMod, centerY - size / sizeMod)
  } else if (direction === 'left') {
    ctx.moveTo(centerX - size / sizeMod, centerY)
    ctx.lineTo(centerX + size / sizeMod, centerY - size / sizeMod)
    ctx.lineTo(centerX + size / sizeMod, centerY + size / sizeMod)
  } else if (direction === 'right') {
    ctx.moveTo(centerX + size / sizeMod, centerY)
    ctx.lineTo(centerX - size / sizeMod, centerY - size / sizeMod)
    ctx.lineTo(centerX - size / sizeMod, centerY + size / sizeMod)
  }
  ctx.fillStyle = color
  ctx.closePath()
  ctx.fill()
}
