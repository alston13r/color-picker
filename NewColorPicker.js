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

    {
      const outer = document.createElement('div')
      outer.classList.add('color-picker', 'g-col-12')
      const inner = document.createElement('div')
      inner.classList.add('color-picker', 'flex-row', 'center')
      outer.appendChild(inner)
      inner.appendChild(hueDiv)
      bottomContainer.appendChild(outer)
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
      background: paletteContainerBackground
    }





    // show initial color
    {
      const hsv = this._color.hsv

      // initial placement of droppers
      const paletteBounds = paletteContainer.getBoundingClientRect()
      const paletteDropperBounds = paletteDropper.getBoundingClientRect()

      paletteDropper.style.left = hsv[1] * paletteBounds.width - paletteDropperBounds.width / 2 + 'px'
      paletteDropper.style.top = (1 - hsv[2]) * paletteBounds.height - paletteDropperBounds.height / 2 + 'px'

      const hueSliderBounds = hueDiv.getBoundingClientRect()
      const hueDropperBounds = hueDropper.getBoundingClientRect()

      hueDropper.style.left = hsv[0] / 360 * hueSliderBounds.width - hueDropperBounds.width / 2 + 'px'
      hueDropper.style.top = hueSliderBounds.height / 2 - hueDropperBounds.height / 2 + 'px'

      // initial display of color
      paletteContainer.style.setProperty('--hue', hsv[0])
      hueDropper.style.backgroundColor = `hsl(${hsv[0]}, 100%, 50%)`

      const str = this._color.toRGBString()
      paletteDropper.style.backgroundColor = str
      paletteSampleDiv.style.backgroundColor = str

      // initial formats
      {
        // hex
        const str = this._color.toHexString()
        const formatted = str
        console.log(str, '"' + formatted + '"')
        hexInput.value = formatted
      }
      {
        // rgb
        const str = this._color.toRGBString()
        const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
        console.log(str, '"' + formatted + '"')
        rgbInput.value = formatted
      }
      {
        // cmyk
        const str = this._color.toCMYKString()
        const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
        console.log(str, '"' + formatted + '"')
        cmykInput.value = formatted
      }
      {
        // hsv
        const str = this._color.toHSVString()
        const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
        console.log(str, '"' + formatted + '"')
        hsvInput.value = formatted
      }
      {
        // hsl
        const str = this._color.toHSLString()
        const formatted = str.substring(str.indexOf('(') + 1, str.indexOf(')'))
        console.log(str, '"' + formatted + '"')
        hslInput.value = formatted
      }
    }








    // /**
    //  * @param {number} u 
    //  * @param {number} v 
    //  */
    // function setPaletteDropperPos(u, v) {
    //   const dropperBounds = paletteDropper.getBoundingClientRect()
    //   const paletteBounds = paletteContainer.getBoundingClientRect()

    //   paletteDropper.style.left = (u * paletteBounds.width - dropperBounds.width / 2) + 'px'
    //   paletteDropper.style.top = (v * paletteBounds.height - dropperBounds.height / 2) + 'px'
    // }


    // const setSaturationAndValue = (() => {
    //   const color = new Color()

    //   /**
    //    * @param {number} saturation 0 <= saturation <= 1
    //    * @param {number} value 0 <= value <= 1
    //    */
    //   return (saturation, value) => {
    //     color.hsv = [this._hue, saturation, value]

    //     const str = color.toRGBString()
    //     paletteDropper.style.backgroundColor = str
    //     hueDropper.style.backgroundColor = str

    //     //   this.lastSV[0] = saturation
    //     //   this.lastSV[1] = value
    //   }
    // })()


    // /**
    //  * @param {number} t 0 <= t <= 1
    //  */
    // function setHueDropperPos(t) {
    //   const dropperBounds = hueDropper.getBoundingClientRect()
    //   const sliderBounds = hueDiv.getBoundingClientRect()
    //   hueDropper.style.left = (t * sliderBounds.width - dropperBounds.width / 2) + 'px'
    //   hueDropper.style.top = (sliderBounds.height / 2 - dropperBounds.height / 2) + 'px'
    // }




    // [-] initial color
    //   [x] palette
    //     [x] dropper
    //     [x] background
    //     [x] sample
    //   [x] hue dropper
    //   [ ] text inputs

    // [ ] text inputs
    //   [ ] validate input
    //   [ ] update color
    //   [ ] update other inputs
    //   [ ] update hue slider
    //   [ ] update palette

    // [-] hue slider
    //   [x] update color
    //   [x] update palette
    //   [ ] update inputs

    // [-] paletter dropper
    //   [x] update color
    //   [ ] update inputs





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

      /**
       * @param {MouseEvent} e 
       */
      function updatePos(e) {
        const paletteBounds = paletteContainer.getBoundingClientRect()
        const ox = ColorPicker._clamp(e.clientX - paletteBounds.x, 0, paletteBounds.width)
        const oy = ColorPicker._clamp(e.clientY - paletteBounds.y, 0, paletteBounds.height)

        const u = ox / paletteBounds.width
        const v = oy / paletteBounds.height

        const dropperBounds = paletteDropper.getBoundingClientRect()
        const dropperWidth = dropperBounds.width
        const dropperHeight = dropperBounds.height

        paletteDropper.style.left = ox - dropperWidth / 2 + 'px'
        paletteDropper.style.top = oy - dropperHeight / 2 + 'px'

        color.hsv = [getHue(), u, 1 - v]

        const str = color.toRGBString()
        paletteDropper.style.backgroundColor = str
        paletteSampleDiv.style.backgroundColor = str

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
      const setHue = hue => this._hue = hue

      const callback = this.colorChangeCallback

      /**
       * @param {MouseEvent} e 
       */
      function updatePosMouse(e) {
        const bounds = hueDiv.getBoundingClientRect()
        const ox = ColorPicker._clamp(e.clientX - bounds.x, 0, bounds.width)

        hueDropper.style.left = ox + 'px'

        const t = ox / bounds.width
        const hue = t * 360
        setHue(hue)






        paletteContainer.style.setProperty('--hue', hue)

        const hsv = color.hsv
        hsv[0] = hue
        color.hsv = hsv

        const str = color.toRGBString()
        paletteDropper.style.backgroundColor = str
        paletteSampleDiv.style.backgroundColor = str

        const dropperBounds = hueDropper.getBoundingClientRect()
        const dropperWidth = dropperBounds.width
        const dropperHeight = dropperBounds.height
        hueDropper.style.left = ox - dropperWidth / 2 + 'px'
        hueDropper.style.top = bounds.height / 2 - dropperHeight / 2 + 'px'

        hueDropper.style.backgroundColor = `hsl(${hue}, 100%, 50%)`

        callback(color)
      }

      /**
       * @param {WheelEvent} e 
       */
      function updatePosWheel(e) {
        if (e.deltaY === 0) return

        const scrollDir = Math.sign(e.deltaY)

        const currHue = getHue()
        if (currHue === 0 && scrollDir < 0) return
        if (currHue === 360 && scrollDir > 0) return

        const newHue = ColorPicker._clamp(currHue + scrollDir, 0, 360)
        setHue(newHue)




        const bounds = hueDiv.getBoundingClientRect()
        const ox = newHue / 360 * bounds.width







        paletteContainer.style.setProperty('--hue', newHue)

        const hsv = color.hsv
        hsv[0] = newHue
        color.hsv = hsv

        const str = color.toRGBString()
        paletteDropper.style.backgroundColor = str
        paletteSampleDiv.style.backgroundColor = str

        const dropperBounds = hueDropper.getBoundingClientRect()
        const dropperWidth = dropperBounds.width
        const dropperHeight = dropperBounds.height
        hueDropper.style.left = ox - dropperWidth / 2 + 'px'
        hueDropper.style.top = bounds.height / 2 - dropperHeight / 2 + 'px'

        hueDropper.style.backgroundColor = `hsl(${newHue}, 100%, 50%)`





        callback(color)
      }

      /**
       * @param {MouseEvent | WheelEvent} e 
       */
      function updatePos(e) {
        if (e instanceof WheelEvent) updatePosWheel(e)
        else if (e instanceof MouseEvent) updatePosMouse(e)
        else return



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
      hueDiv.addEventListener('wheel', e => {
        e.preventDefault()
        updatePos(e)
      })
    }
  }

  // /**
  //  * @param {Color} color 
  //  * @param {'hex' | 'rgb' | 'cmyk' | 'hsv' | 'hsl' | ''} [skipUpdate='']
  //  */
  // _setColor(color, skipUpdate = '') {

  // }

  /**
   * @returns {Color}
   */
  getColor() {
    return this._color.clone()
  }

  /**
   * @param {Color} color 
   */
  setColor(color) {
    if (!color || color._isColor !== true) return
    this._color.copy(color)
  }



  // /**
  //  * @param {number} hue 0 <= hue < 360
  //  */
  // setHue(hue) {
  //   if (typeof hue !== 'number') return
  //   this._hue = Math.round(hue) % 360

  //   const hsl = this._color.hsl
  //   hsl[0] = this._hue
  //   this._color.hsl = hsl

  //   const str = this._color.toRGBString()
  //   this.palette.sample.style.backgroundColor = str
  //   this.palette.background.style.backgroundColor = str
  // }
}