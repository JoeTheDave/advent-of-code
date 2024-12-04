# Advent of Code

https://adventofcode.com/
https://projecteuler.net/archives

## Scripts

- `npm run create` - Will prompt you for problem details and generate solution boilerplate
- `npm run exec` - Will execute the solution function in the most recently generated problem directory
- `npm run change` - Will prompt you for problem details and switch execution directory
- `npm run report` - Will generate a simple report showing which problems have been solved vs which have been started and not solved.
- `npm run vis` - Launches a web server, dynamically loads the module from the most recently generated problem directory, and executes the visualize function on that module.

## Debugging a solution

Run the `Debug Terminal` configuration
This will open up a new debug terminal
Set breakpoints as needed
run `npm run exec yyyy dd` to debug the solution file for the target day
When finished, kill the debug terminal

## Example Data Visualtiztion Function

```
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const visualize = () => {
  const root = document.getElementById('root') as HTMLElement
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 800
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  setInterval(() => {
    ctx.beginPath()
    ctx.moveTo(getRandomNumber(50, 750), getRandomNumber(50, 750))
    ctx.lineTo(getRandomNumber(50, 750), getRandomNumber(50, 750))
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 2
    ctx.stroke()
  }, 100)
}
```

### TODO

- [ ] Test coverage?
