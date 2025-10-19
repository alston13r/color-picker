class ColorPicker extends EventTarget {
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
  /** @type {number} */
  _saturation = this._color.hsv[1]
  /** @type {number} */
  _value = this._color.hsv[2]

  /**
   * Constructs a ColorPicker, attaching to the specified target element. Target is either
   * an HTMLElement or a query selector.
   * 
   * @param {HTMLElement | string} targetElement 
   */
  constructor(targetElement) {
    if (typeof targetElement === 'string') {
      targetElement = document.body.querySelector(targetElement)
      if (targetElement === null) throw Error(`Could not find element: ${targetElement}`)
    }

    if (!(targetElement instanceof HTMLElement)) {
      throw Error('Must specify a target element when constructing a ColorPicker')
    }

    super()

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

    // initial placement of droppers
    this._updatePaletteDropper()
    this._updateHueDropper()

    // initial display of color
    this._updatePalette()
    this._updateHueSlider()

    // initial formats
    this._updateFields()

    const _setColor = this._setColor.bind(this)
    const callback = this._dispatchColorChange.bind(this)

    const hexValidator = {
      lastValid: hexInput.value,
      validate() {
        let str = hexInput.value.trim()
        const validated = Color.ValidateHexString(str)
        if (validated) {
          this.lastValid = validated.toHexString()
          _setColor(validated, 'hex')
          callback()
        }
      },
      blur() {
        hexInput.value = this.lastValid
      }
    }

    const rgbValidator = {
      lastValid: rgbInput.value,
      validate() {
        let str = rgbInput.value.trim()
        const validated = Color.ValidateRGBString(str)
        if (validated) {
          this.lastValid = validated.toRGBStringTrimmed()
          _setColor(validated, 'rgb')
          callback()
        }
      },
      blur() {
        rgbInput.value = this.lastValid
      }
    }

    const cmykValidator = {
      lastValid: cmykInput.value,
      validate() {
        let str = cmykInput.value.trim()
        const validated = Color.ValidateCMYKString(str)
        if (validated) {
          this.lastValid = validated.toCMYKStringTrimmed()
          _setColor(validated, 'cmyk')
          callback()
        }
      },
      blur() {
        cmykInput.value = this.lastValid
      }
    }

    const hsvValidator = {
      lastValid: hsvInput.value,
      validate() {
        let str = hsvInput.value.trim()
        const validated = Color.ValidateHSVString(str)
        if (validated) {
          this.lastValid = validated.toHSVStringTrimmed(true)
          _setColor(validated, 'hsv')
          callback()
        }
      },
      blur() {
        hsvInput.value = this.lastValid
      }
    }

    const hslValidator = {
      lastValid: hslInput.value,
      validate() {
        let str = hslInput.value.trim()
        const validated = Color.ValidateHSLString(str)
        if (validated) {
          this.lastValid = validated.toHSLStringTrimmed(true)
          _setColor(validated, 'hsl')
          callback()
        }
      },
      blur() {
        hslInput.value = this.lastValid
      }
    }

    hexInput.addEventListener('input', () => hexValidator.validate())
    rgbInput.addEventListener('input', () => rgbValidator.validate())
    cmykInput.addEventListener('input', () => cmykValidator.validate())
    hsvInput.addEventListener('input', () => hsvValidator.validate())
    hslInput.addEventListener('input', () => hslValidator.validate())

    hexInput.addEventListener('blur', () => hexValidator.blur())
    rgbInput.addEventListener('blur', () => rgbValidator.blur())
    cmykInput.addEventListener('blur', () => cmykValidator.blur())
    hsvInput.addEventListener('blur', () => hsvValidator.blur())
    hslInput.addEventListener('blur', () => hslValidator.blur())

    // palette dropper
    {
      let movingDropper = false
      const color = this._color
      const getHue = () => this._hue

      const setSV = (saturation, value) => {
        this._saturation = saturation
        this._value = value
      }

      const updatePalette = this._updatePalette.bind(this)
      const updateDropper = this._updatePaletteDropper.bind(this)
      const updateFields = this._updateFields.bind(this)

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
        setSV(u, 1 - v)

        updatePalette()
        updateDropper()


        callback()

        updateFields()
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

      const updateHueSlider = this._updateHueSlider.bind(this)
      const updatePalette = this._updatePalette.bind(this)
      const updateDropper = this._updateHueDropper.bind(this)
      const updateFields = this._updateFields.bind(this)

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
        callback()

        updateFields()
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
   * Dispatches a color change event to any event listeners.
   */
  _dispatchColorChange() {
    this.dispatchEvent(new CustomEvent('colorchange', { detail: { color: this.getColor() } }))
  }

  /**
   * Sets the current color, updating all elements of the color picker.
   * Optional exclude will ignore that text field, used when updating from
   * user typing a color format in that text field.
   * 
   * @param {Color} color the color to set
   * @param {'hex' | 'rgb' | 'cmyk' | 'hsv' | 'hsl'} exclude the field to exclude
   */
  _setColor(color, exclude = '') {
    this._color.copy(color)
    this._hue = this._color.hsv[0]
    this._saturation = this._color.hsv[1]
    this._value = this._color.hsv[2]
    this._updateFields(exclude)
    this._updatePaletteDropper()
    this._updateHueDropper()
    this._updatePalette()
    this._updateHueSlider()
  }

  /**
   * Sets the current color.
   * 
   * @param {Color} color 
   */
  setColor(color) {
    if (!color || color._isColor !== true) return
    this._setColor(color)
  }

  /**
   * Updates the text fields to match the current color, excluding a field if specified.
   * 
   * @param {'hex' | 'rgb' | 'cmyk' | 'hsv' | 'hsl'} exclude the field to exclude
   */
  _updateFields(exclude = '') {
    if (exclude.length === 0) {
      this._updateHexInput()
      this._updateRGBInput()
      this._updateCMYKInput()
      this._updateHSVInput()
      this._updateHSLInput()
    } else {
      if (exclude !== 'hex') this._updateHexInput()
      if (exclude !== 'rgb') this._updateRGBInput()
      if (exclude !== 'cmyk') this._updateCMYKInput()
      if (exclude !== 'hsv') this._updateHSVInput()
      if (exclude !== 'hsl') this._updateHSLInput()
    }
  }

  /**
   * Sets the current hue.
   * 
   * @param {number} hue 0 <= hue <= 360
   */
  _setHue(hue) {
    this._hue = ColorPicker._clamp(hue, 0, 360)
    const hsv = this._color.hsv
    hsv[0] = this._hue
    this._color.hsv = hsv
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
    const container = this.palette.container
    const dropper = this.droppers.paletteDropper

    const paletteBounds = container.getBoundingClientRect()
    const paletteDropperBounds = dropper.getBoundingClientRect()

    dropper.style.left = this._saturation * paletteBounds.width - paletteDropperBounds.width / 2 + 'px'
    dropper.style.top = (1 - this._value) * paletteBounds.height - paletteDropperBounds.height / 2 + 'px'
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
    this.inputs.hexInput.value = this._color.toHexString()
  }

  /**
   * Updates the rgb input to match that of the current color.
   */
  _updateRGBInput() {
    this.inputs.rgbInput.value = this._color.toRGBStringTrimmed()
  }

  /**
   * Updates the cmyk input to match that of the current color.
   */
  _updateCMYKInput() {
    this.inputs.cmykInput.value = this._color.toCMYKStringTrimmed()
  }

  /**
   * Updates the hsv input to match that of the current color.
   */
  _updateHSVInput() {
    const hf = Math.round(this._hue) % 360
    const sf = Math.floor(this._saturation * 100)
    const vf = Math.floor(this._value * 100)
    this.inputs.hsvInput.value = `${hf}°, ${sf}%, ${vf}%`
  }

  /**
   * Updates the hsl input to match that of the current color.
   */
  _updateHSLInput() {
    this.inputs.hslInput.value = this._color.toHSLStringTrimmed(true)
  }
}