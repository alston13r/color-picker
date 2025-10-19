// should have method for getting current color
// should have method for setting color
// should have event for color change


class ColorPicker {
  /**
   * Clamps the value x between min and max, inclusive for both.
   * @param {number} x the number to clamp
   * @param {number} [min=0] minimum bound
   * @param {number} [max=1] maximum bound
   * @returns the clamped value
   */
  static _clamp(x, min = 0, max = 1) {
    return Math.max(Math.min(x, max), min)
  }

  /** @type {Color} */
  _color = new Color()

  /** @type {number} */
  _hue = this._color.hsv[0]

  _hsvWrapper = this._color.getHSVWrapper()

  /**
   * @param {HTMLElement} targetElement 
   * @param {(color: Color) => void} onChange 
   */
  constructor(targetElement, onChange = () => void 0) {
    this.colorChangeCallback = onChange

    const container = document.createElement('div')
    container.classList.add('color-picker', 'container', 'flex-col', 'center')

    const topContainer = document.createElement('div')
    topContainer.classList.add('color-picker', 'flex-row')
    topContainer.style.width = '100%'

    const paletteSampleDiv = document.createElement('div')
    paletteSampleDiv.classList.add('color-picker', 'paletteSample')

    const paletteContainer = document.createElement('div')
    paletteContainer.classList.add('color-picker', 'paletteContainer')

    const paletteContainerBackground = document.createElement('div')
    const paletteContainerSaturation = document.createElement('div')
    const paletteContainerValue = document.createElement('div')
    paletteContainerBackground.classList.add('color-picker', 'paletteBackground')
    paletteContainerSaturation.classList.add('color-picker', 'paletteSaturation')
    paletteContainerValue.classList.add('color-picker', 'paletteValue')

    const paletteDropper = document.createElement('div')
    paletteDropper.classList.add('color-picker', 'dropper')

    paletteContainer.append(paletteContainerBackground, paletteContainerSaturation, paletteContainerValue, paletteDropper)
    topContainer.append(paletteSampleDiv, paletteContainer)

    const bottomContainer = document.createElement('div')
    bottomContainer.classList.add('color-picker', 'grid', 'gap')
    bottomContainer.style.margin = '20px'
    bottomContainer.style.boxSizing = 'border-box'

    const hueDiv = document.createElement('div')
    hueDiv.classList.add('color-picker', 'hueSlider')

    const hueDropper = document.createElement('div')
    hueDropper.classList.add('color-picker', 'dropper')
    hueDiv.appendChild(hueDropper)

    const hueSliderContainer = document.createElement('div')
    hueSliderContainer.classList.add('color-picker', 'g-col-12')

    {
      const inner = document.createElement('div')
      inner.classList.add('color-picker', 'flex-row', 'center')
      hueSliderContainer.appendChild(inner)
      inner.appendChild(hueDiv)
      bottomContainer.appendChild(hueSliderContainer)
    }

    /**
     * Builds an input element, specifying the legend text, if it is wide,
     * and whether or not to center to the legend text.
     * 
     * @param {string} legendText the legend text, displayed above the input
     * @param {boolean} [wide=false] if the input should be wide
     * @param {center} [center=false] if the legend text should be centered
     */
    function buildInput(legendText, wide = false, center = false) {
      const input = document.createElement('input')
      input.classList.add('color-picker')
      if (wide) input.classList.add('wide')
      input.type = 'text'
      input.id = crypto.randomUUID()

      const legend = document.createElement('legend')
      legend.innerText = legendText

      const fieldset = document.createElement('fieldset')
      fieldset.classList.add('color-picker', 'textInput')
      if (center) fieldset.classList.add('center')
      fieldset.append(legend, input)

      const outer = document.createElement('div')
      outer.classList.add('color-picker', wide ? 'g-col-12' : 'g-col-3')
      outer.appendChild(fieldset)

      bottomContainer.appendChild(outer)

      return input
    }

    const hexInput = buildInput('Hex', true, true)
    const rgbInput = buildInput('RGB')
    const cmykInput = buildInput('CMYK')
    const hsvInput = buildInput('HSV')
    const hslInput = buildInput('HSL')

    container.append(topContainer, bottomContainer)
    targetElement.appendChild(container)

    this.inputs = { hexInput, rgbInput, cmykInput, hsvInput, hslInput }
    this.droppers = { paletteDropper, hueDropper }
    this.palette = {
      sample: paletteSampleDiv,
      background: paletteContainerBackground,
      container: paletteContainer
    }
    this.hueContainer = {
      container: hueSliderContainer,
      slider: hueDiv
    }

    // show initial color
    {
      // initial placement of droppers
      this._updatePaletteDropper()
      this._updateHueDropper()

      // initial display of color
      this._updatePalette()
      this._updateHueSlider()

      // initial formats
      this._updateHexInput()
      this._updateRGBInput()
      this._updateCMYKInput()
      this._updateHSVInput()
      this._updateHSLInput()
    }







    hexInput.addEventListener('input', e => {
      console.log(e.target.value)
    })

    rgbInput.addEventListener('input', e => {
      console.log(e.target.value)
    })

    cmykInput.addEventListener('input', e => {
      console.log(e.target.value)
    })

    hsvInput.addEventListener('input', e => {
      console.log(e.target.value)
    })

    hslInput.addEventListener('input', e => {
      console.log(e.target.value)
    })

    // hexInput.addEventListener('blur', () => {

    // })

    // rgbInput.addEventListener('blur', () => {

    // })

    // cmykInput.addEventListener('blur', () => {

    // })

    // hsvInput.addEventListener('blur', () => {

    // })

    // hslInput.addEventListener('blur', () => {

    // })


    // palette dropper
    {
      let movingDropper = false
      const color = this._color
      const getHue = () => this._hue
      const callback = this.colorChangeCallback

      const updatePalette = this._updatePalette.bind(this)
      const updateDropper = this._updatePaletteDropper.bind(this)

      /**
       * @param {MouseEvent} e 
       */
      function updatePos(e) {
        const paletteBounds = paletteContainer.getBoundingClientRect()
        const ox = ColorPicker._clamp(e.clientX - paletteBounds.x, 0, paletteBounds.width)
        const oy = ColorPicker._clamp(e.clientY - paletteBounds.y, 0, paletteBounds.height)

        const u = ox / paletteBounds.width
        const v = oy / paletteBounds.height
        color.hsv = [getHue(), u, 1 - v]

        updatePalette()
        updateDropper()

        callback(color)

        // update text fields
      }

      paletteContainer.addEventListener('mousedown', e => {
        movingDropper = true
        updatePos(e)
      })
      window.addEventListener('mouseup', () => {
        movingDropper = false
      })
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') movingDropper = false
      })
      window.addEventListener('mousemove', e => {
        if (movingDropper) updatePos(e)
      })
    }

    // hue dropper
    {
      let movingDropper = false
      const color = this._color

      const getHue = () => this._hue
      const setHue = this._setHue.bind(this)

      const callback = this.colorChangeCallback

      const updateHueSlider = this._updateHueSlider.bind(this)
      const updatePalette = this._updatePalette.bind(this)
      const updateDropper = this._updateHueDropper.bind(this)

      /**
       * @param {MouseEvent | WheelEvent} e 
       */
      function updatePos(e) {
        let newHue = getHue()

        if (e instanceof WheelEvent) {
          if (e.deltaY === 0) return

          const scrollDir = Math.sign(e.deltaY)

          if (newHue === 0 && scrollDir < 0) return
          if (newHue === 360 && scrollDir > 0) return

          newHue = ColorPicker._clamp(newHue + scrollDir, 0, 360)
        }

        else if (e instanceof MouseEvent) {
          const bounds = hueDiv.getBoundingClientRect()
          const ox = ColorPicker._clamp(e.clientX - bounds.x, 0, bounds.width)

          const t = ox / bounds.width
          newHue = t * 360
        }

        else return

        setHue(newHue)
        updatePalette()
        updateHueSlider()
        updateDropper()
        callback(color)

        // update text fields
      }

      hueDropper.addEventListener('mousedown', e => {
        e.stopPropagation()
        updatePos(e)
      })
      hueDropper.addEventListener('mousedown', e => {
        e.stopPropagation()
        movingDropper = true
        updatePos(e)
      })
      hueDiv.addEventListener('mousedown', e => {
        e.stopPropagation()
        movingDropper = true
        updatePos(e)
      })
      hueDiv.addEventListener('mouseup', () => {
        movingDropper = false
      })
      window.addEventListener('mouseup', () => {
        movingDropper = false
      })
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') movingDropper = false
      })
      window.addEventListener('mousemove', e => {
        if (movingDropper) updatePos(e)
      })
      hueSliderContainer.addEventListener('wheel', e => {
        e.preventDefault()
        updatePos(e)
      })
    }
  }

  /**
   * Gets the current color.
   * 
   * @returns {Color}
   */
  getColor() {
    return this._color.clone()
  }

  /**
   * Sets the current color.
   * 
   * @param {Color} color 
   */
  setColor(color) {
    if (!color || color._isColor !== true) return
    this._color.copy(color)
  }

  /**
   * Sets the current hue.
   * 
   * @param {number} hue 0 <= hue <= 360
   */
  _setHue(hue) {
    this._hue = ColorPicker._clamp(hue, 0, 360)
    this._hsvWrapper.h = this._hue
  }

  /**
   * Updates the palette's sample div, gradient div, and dropper to match
   * that of the current color.
   */
  _updatePalette() {
    const str = this._color.toRGBString()
    this.droppers.paletteDropper.style.backgroundColor = str
    this.palette.sample.style.backgroundColor = str
    this.palette.container.style.setProperty('--hue', this._hue)
  }

  /**
   * Updates the position of the palette dropper to match that of the current color.
   */
  _updatePaletteDropper() {
    const hsv = this._color.hsv

    const container = this.palette.container
    const dropper = this.droppers.paletteDropper

    const paletteBounds = container.getBoundingClientRect()
    const paletteDropperBounds = dropper.getBoundingClientRect()

    dropper.style.left = hsv[1] * paletteBounds.width - paletteDropperBounds.width / 2 + 'px'
    dropper.style.top = (1 - hsv[2]) * paletteBounds.height - paletteDropperBounds.height / 2 + 'px'
  }

  /**
   * Updates the hue slider's dropper to match that of the current color.
   */
  _updateHueSlider() {
    this.droppers.hueDropper.style.backgroundColor = `hsl(${this._hue}, 100%, 50%)`
  }

  /**
   * Updates the position of the hue dropper to match that of the current color.
   */
  _updateHueDropper() {
    const slider = this.hueContainer.slider
    const dropper = this.droppers.hueDropper

    const hueSliderBounds = slider.getBoundingClientRect()
    const hueDropperBounds = dropper.getBoundingClientRect()

    dropper.style.left = this._hue / 360 * hueSliderBounds.width - hueDropperBounds.width / 2 + 'px'
    dropper.style.top = hueSliderBounds.height / 2 - hueDropperBounds.height / 2 + 'px'
  }

  /**
   * Updates the hex input to match that of the current color.
   */
  _updateHexInput() {
    const str = this._color.toHexString()
    this.inputs.hexInput.value = str
  }

  /**
   * Updates the rgb input to match that of the current color.
   */
  _updateRGBInput() {
    const str = this._color.toRGBString()
    const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
    this.inputs.rgbInput.value = formatted
  }

  /**
   * Updates the cmyk input to match that of the current color.
   */
  _updateCMYKInput() {
    const str = this._color.toCMYKString()
    const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
    this.inputs.cmykInput.value = formatted
  }

  /**
   * Updates the hsv input to match that of the current color.
   */
  _updateHSVInput() {
    const str = this._color.toHSVString(true)
    const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
    this.inputs.hsvInput.value = formatted
  }

  /**
   * Updates the hsl input to match that of the current color.
   */
  _updateHSLInput() {
    const str = this._color.toHSLString(true)
    const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
    this.inputs.hslInput.value = formatted
  }
}