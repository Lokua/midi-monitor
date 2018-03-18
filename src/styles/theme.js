import { invert, lighten } from 'polished'

const text = 'midnightblue'
const textInverted = lighten(0.25, invert(text))
const background = textInverted
const backgroundInverted = text

export default {
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
