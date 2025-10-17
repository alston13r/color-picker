function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min)
}

class Color {
  /** @type {number} */
  _red = 0

  /** @type {number} */
  _green = 0

  /** @type {number} */
  _blue = 0

  /** @param {number} red */
  set red(red) {
    this._red = clamp(red, 0, 1)
  }

  /** @returns {number} */
  get red() {
    return this._red
  }

  /** @param {number} blue */
  set blue(blue) {
    this._blue = clamp(blue, 0, 1)
  }

  /** @returns {number} */
  get blue() {
    return this._blue
  }

  /** @param {number} green */
  set green(green) {
    this._green = clamp(green, 0, 1)
  }

  /** @returns {number} */
  get green() {
    return this._green
  }

  /** @param {[number, number, number]} rgb */
  set rgb(rgb) {
    if (rgb instanceof Array) {
      this.red = rgb[0] ?? 0
      this.green = rgb[1] ?? 0
      this.blue = rgb[2] ?? 0
    }
  }

  /**
   * Returns rgb string format of color where values are between 0 and 255.
   * @returns {string} rgb(red, green, blue)
   */
  toRGBString() {
    const red = Math.round(this.red * 255)
    const green = Math.round(this.green * 255)
    const blue = Math.round(this.blue * 255)
    return `rgb(${red}, ${green}, ${blue})`
  }

  /**
   * Returns hex string format of color where values are between 0x00 and 0xFF.
   * @returns {string} #RRGGBB
   */
  toHEXString() {
    /**
     * @param {string} str 
     * @returns {string}
     */
    function ensureLength(str) {
      return '0'.repeat(2 - str.length) + str
    }

    const red = ensureLength(Math.round(this.red * 255).toString(16))
    const green = ensureLength(Math.round(this.green * 255).toString(16))
    const blue = ensureLength(Math.round(this.blue * 255).toString(16))

    return '#' + red + green + blue
  }
}