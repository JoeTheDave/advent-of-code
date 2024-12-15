export const getContext = (x: number, y: number) => {
  const root = document.getElementById('root') as HTMLElement
  const canvas = document.createElement('canvas')
  canvas.width = x
  canvas.height = y
  root.appendChild(canvas)
  return canvas.getContext('2d') as CanvasRenderingContext2D
}
