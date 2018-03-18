import { mix } from 'polished'

export const palettes = new Map()
const defaultPalette = 'Light'

palettes.set('Light', makeTheme('#222', '#dedede'))
palettes.set('Dark', makeTheme('#dedede'))
palettes.set('Cyan', makeTheme('cyan'))
palettes.set('Yellow', makeTheme('yellow'))
palettes.set('Magenta', makeTheme('magenta'))
palettes.set('Dodger', makeTheme('dodgerblue', mix(0.95, '#222', 'dodgerblue')))

export default function createTheme(palette) {
  const createColors = palettes.get(palette) || palettes.get(defaultPalette)

  return {
    color: createColors(),
    unit: {
      titleBarHeight: '16px'
    }
  }
}

function makeTheme(text, background = '#222') {
  return () => {
    const textInverted = background
    const backgroundInverted = text

    return {
      text,
      textInverted,
      background,
      backgroundInverted
    }
  }
}
