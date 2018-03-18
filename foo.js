const typeCodeMap = {
  noteOn: 144,
  noteOff: 128,
  pitchBend: 224,
  cc: 176,
  channelPressure: 208,
  clock: 248,
  start: 250,
  stop: 252,
  continue: 251,
  songPosition: 242
}

Object.keys(typeCodeMap).forEach(k => {
  const value = typeCodeMap[k]
  const string = value.toString(16)
  console.info(string)
})
