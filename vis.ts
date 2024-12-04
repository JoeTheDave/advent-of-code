async function executeDataVis() {
  console.log('Loading Data Visualization')
  let modulePath = ''

  try {
    modulePath = (await fetch('./scripts/.recent-exec').then(response => response.text()))
      .split('../')[1]
      .split('\n')[0]
  } catch (error) {
    console.log('Unable to derive module')
  }

  try {
    const module = await import(/* @vite-ignore */ `./${modulePath}`)
    console.log(`module found: ${modulePath}`)
    if ('visualize' in module && typeof module.visualize === 'function') {
      module.visualize()
    } else {
      console.log('Visualization not implemented')
      const root = document.getElementById('root') as HTMLElement
      root.innerHTML += '<h1>Visualization not implemented</h1>'
    }
  } catch (error) {
    console.log(`Unable to load module: ${modulePath}`)
  }
}

executeDataVis()
