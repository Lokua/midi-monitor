import { invert, lighten } from 'polished'

export default (main = 'midnightblue') => {
  const text = main
  const textInverted = lighten(0.25, invert(text))
  const background = textInverted
  const backgroundInverted = text

  return {
    color: {
      text,
      textInverted,
      background,
      backgroundInverted
    },
    unit: {
      titleBarHeight: '16px'
    }
  }
}
