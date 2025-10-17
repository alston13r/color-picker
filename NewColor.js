class Color {
  /** @type {Record<string, string>} mapping of all CSS named colors to their hex string */
  static _NamedColors = {
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'aqua': '#00ffff',
    'aquamarine': '#7fffd4',
    'azure': '#f0ffff',
    'beige': '#f5f5dc',
    'bisque': '#ffe4c4',
    'black': '#000000',
    'blanchedalmond': '#ffebcd',
    'blue': '#0000ff',
    'blueviolet': '#8a2be2',
    'brown': '#a52a2a',
    'burlywood': '#deb887',
    'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00',
    'chocolate': '#d2691e',
    'coral': '#ff7f50',
    'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc',
    'crimson': '#dc143c',
    'cyan': '#00ffff',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b',
    'darkgray': '#a9a9a9',
    'darkgreen': '#006400',
    'darkgrey': '#a9a9a9',
    'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f',
    'darkorange': '#ff8c00',
    'darkorchid': '#9932cc',
    'darkred': '#8b0000',
    'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f',
    'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f',
    'darkslategrey': '#2f4f4f',
    'darkturquoise': '#00ced1',
    'darkviolet': '#9400d3',
    'deeppink': '#ff1493',
    'deepskyblue': '#00bfff',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'dodgerblue': '#1e90ff',
    'firebrick': '#b22222',
    'floralwhite': '#fffaf0',
    'forestgreen': '#228b22',
    'fuchsia': '#ff00ff',
    'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff',
    'gold': '#ffd700',
    'goldenrod': '#daa520',
    'gray': '#808080',
    'green': '#008000',
    'greenyellow': '#adff2f',
    'grey': '#808080',
    'honeydew': '#f0fff0',
    'hotpink': '#ff69b4',
    'indianred': '#cd5c5c',
    'indigo': '#4b0082',
    'ivory': '#fffff0',
    'khaki': '#f0e68c',
    'lavender': '#e6e6fa',
    'lavenderblush': '#fff0f5',
    'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd',
    'lightblue': '#add8e6',
    'lightcoral': '#f08080',
    'lightcyan': '#e0ffff',
    'lightgoldenrodyellow': '#fafad2',
    'lightgray': '#d3d3d3',
    'lightgreen': '#90ee90',
    'lightgrey': '#d3d3d3',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'lightsteelblue': '#b0c4de',
    'lightyellow': '#ffffe0',
    'lime': '#00ff00',
    'limegreen': '#32cd32',
    'linen': '#faf0e6',
    'magenta': '#ff00ff',
    'maroon': '#800000',
    'mediumaquamarine': '#66cdaa',
    'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3',
    'mediumpurple': '#9370db',
    'mediumseagreen': '#3cb371',
    'mediumslateblue': '#7b68ee',
    'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585',
    'midnightblue': '#191970',
    'mintcream': '#f5fffa',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'navy': '#000080',
    'oldlace': '#fdf5e6',
    'olive': '#808000',
    'olivedrab': '#6b8e23',
    'orange': '#ffa500',
    'orangered': '#ff4500',
    'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa',
    'palegreen': '#98fb98',
    'paleturquoise': '#afeeee',
    'palevioletred': '#db7093',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'peru': '#cd853f',
    'pink': '#ffc0cb',
    'plum': '#dda0dd',
    'powderblue': '#b0e0e6',
    'purple': '#800080',
    'rebeccapurple': '#663399',
    'red': '#ff0000',
    'rosybrown': '#bc8f8f',
    'royalblue': '#4169e1',
    'saddlebrown': '#8b4513',
    'salmon': '#fa8072',
    'sandybrown': '#f4a460',
    'seagreen': '#2e8b57',
    'seashell': '#fff5ee',
    'sienna': '#a0522d',
    'silver': '#c0c0c0',
    'skyblue': '#87ceeb',
    'slateblue': '#6a5acd',
    'slategray': '#708090',
    'slategrey': '#708090',
    'snow': '#fffafa',
    'springgreen': '#00ff7f',
    'steelblue': '#4682b4',
    'tan': '#d2b48c',
    'teal': '#008080',
    'thistle': '#d8bfd8',
    'tomato': '#ff6347',
    'turquoise': '#40e0d0',
    'violet': '#ee82ee',
    'wheat': '#f5deb3',
    'white': '#ffffff',
    'whitesmoke': '#f5f5f5',
    'yellow': '#ffff00',
    'yellowgreen': '#9acd32'
  }

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

  /** @type {number} */
  _red = 0

  /** @type {number} */
  _green = 0

  /** @type {number} */
  _blue = 0

  /** @type {boolean} */
  _isColor = true

  /**
   * Defaults to rebeccapurple.
   * 
   * @param {number} red 0 <= red <= 1
   * @param {number} green 0 <= green <= 1
   * @param {number} blue 0 <= blue <= 1
   */
  constructor(red = 0x66 / 0xFF, green = 0x33 / 0xFF, blue = 0x99 / 0xFF) {
    this.rgb = [red, green, blue]
  }

  /**
   * Gets the corresponding color of the named color.
   * 
   * @param {string} name css named color
   * @returns {Color} corresponding color, black if not a valid name
   */
  static GetNamedColor(name) {
    if (typeof name !== 'string') return new Color(0, 0, 0)
    const formattedName = name.trim().split(/\s+/).join('').toLowerCase()
    if (!(formattedName in Color._NamedColors)) return new Color(0, 0, 0)
    return Color.FromHexString(Color._NamedColors[formattedName])
  }

  /**
   * Clones this color, returning a reference to the new color.
   * 
   * @returns {Color} reference to the clone
   */
  clone() {
    return new Color(...this.rgb)
  }

  /**
   * Copies the values of the provided color.
   * 
   * @param {Color} color color to copy
   * @returns {Color} reference to this
   */
  copy(color) {
    if (color.isColor === true) this.rgb = color.rgb
    return this
  }

  /**
   * @returns {number} 0 <= red <= 1
   */
  get red() {
    return this._red
  }

  /**
   * @param {number} red 0 <= red <= 1
   */
  set red(red) {
    this._red = Color._clamp(red, 0, 1)
  }

  /**
   * @returns {number} 0 <= blue <= 1
   */
  get blue() {
    return this._blue
  }

  /**
   * @param {number} blue 0 <= blue <= 1
   */
  set blue(blue) {
    this._blue = Color._clamp(blue, 0, 1)
  }

  /**
   * @returns {number} 0 <= green <= 1
   */
  get green() {
    return this._green
  }

  /**
   * @param {number} green 0 <= green <= 1
   */
  set green(green) {
    this._green = Color._clamp(green, 0, 1)
  }

  /**
   * @param {[number, number, number]} rgb [0 <= red <= 1, 0 <= green <= 1, 0 <= blue <= 1]
   */
  set rgb(rgb) {
    if (rgb instanceof Array) {
      this.red = rgb[0] ?? 0
      this.green = rgb[1] ?? 0
      this.blue = rgb[2] ?? 0
    }
  }

  /**
   * @returns {[number, number, number]} [0 <= red <= 1, 0 <= green <= 1, 0 <= blue <= 1]
   */
  get rgb() {
    return [this.red, this.green, this.blue]
  }

  /**
   * Converts hsv values to rgb values.
   * 
   * @param {number} [h=0] 0 <= h < 360
   * @param {number} [s=0] 0 <= s <= 1
   * @param {number} [v=0] 0 <= v <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number]} [0 <= red <= 1, 0 <= green <= 1, 0 <= blue <= 1]
   */
  static _HSVtoRGB(h = 0, s = 0, v = 0, arr = []) {
    h %= 360

    const C = v * s
    const X = C * (1 - Math.abs((h / 60) % 2 - 1))
    const m = v - C

    let rp = 0
    let gp = 0
    let bp = 0
    if (h < 60) {
      [rp, gp, bp] = [C, X, 0]
    } else if (h < 120) {
      [rp, gp, bp] = [X, C, 0]
    } else if (h < 180) {
      [rp, gp, bp] = [0, C, X]
    } else if (h < 240) {
      [rp, gp, bp] = [0, X, C]
    } else if (h < 300) {
      [rp, gp, bp] = [X, 0, C]
    } else if (h < 360) {
      [rp, gp, bp] = [C, 0, X]
    }

    arr[0] = rp + m
    arr[1] = gp + m
    arr[2] = bp + m

    return arr
  }

  /**
   * @param {[number, number, number]} hsv [0 <= hue < 360, 0 <= saturation <= 1, 0 <= value <= 1]
   */
  set hsv(hsv) {
    if (hsv instanceof Array) {
      this.rgb = Color._HSVtoRGB(hsv[0] ?? 0, hsv[1] ?? 0, hsv[2] ?? 0)
    }
  }

  /**
   * Converts rgb values to hsv values.
   * 
   * @param {number} [r=0] 0 <= red <= 1
   * @param {number} [g=0] 0 <= green <= 1
   * @param {number} [b=0] 0 <= blue <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number]} [0 <= hue < 360, 0 <= saturation <= 1, 0 <= value <= 1]
   */
  static _RGBtoHSV(r = 0, g = 0, b = 0, arr = []) {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    const v = max
    let h = 0
    let s = 0
    if (delta !== 0) {
      switch (max) {
        case r:
          h = 60 * ((g - b) / delta % 6)
          break
        case g:
          h = 60 * ((b - r) / delta + 2)
          break
        case b:
          h = 60 * ((r - g) / delta + 4)
          break
      }
    }

    if (max !== 0) {
      s = delta / max
    }

    arr[0] = h < 0 ? h + 360 : h
    arr[1] = s
    arr[2] = v

    return arr
  }

  /**
   * @returns {[number, number, number]} [0 <= hue < 360, 0 <= saturation <= 1, 0 <= value <= 1]
   */
  get hsv() {
    const rgb = this.rgb
    return Color._RGBtoHSV(rgb[0], rgb[1], rgb[2])
  }

  /**
   * Converts hsl values to rgb values.
   * 
   * @param {number} [h=0] 0 <= hue < 360
   * @param {number} [s=0] 0 <= saturation <= 1
   * @param {number} [l=0] 0 <= light <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number]} [0 <= red <= 1, 0 <= green <= 1, 0 <= blue <= 1]
   */
  static _HSLtoRGB(h = 0, s = 0, l = 0, arr = []) {
    h %= 360

    const C = (1 - Math.abs(2 * l - 1)) * s
    const X = C * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - C / 2

    let rp = 0
    let gp = 0
    let bp = 0
    if (h < 60) {
      [rp, gp, bp] = [C, X, 0]
    } else if (h < 120) {
      [rp, gp, bp] = [X, C, 0]
    } else if (h < 180) {
      [rp, gp, bp] = [0, C, X]
    } else if (h < 240) {
      [rp, gp, bp] = [0, X, C]
    } else if (h < 300) {
      [rp, gp, bp] = [X, 0, C]
    } else if (h < 360) {
      [rp, gp, bp] = [C, 0, X]
    }

    arr[0] = rp + m
    arr[1] = gp + m
    arr[2] = bp + m

    return arr
  }

  /**
   * @param {[number, number, number]} hsl [0 <= hue < 360, 0 <= saturation <= 1, 0 <= light <= 1]
   */
  set hsl(hsl) {
    if (hsl instanceof Array) {
      this.rgb = Color._HSLtoRGB(hsl[0] ?? 0, hsl[1] ?? 0, hsl[2] ?? 0)
    }
  }

  /**
   * Converts rgb values to hsl values.
   * 
   * @param {number} [r=0] 0 <= red <= 1
   * @param {number} [g=0] 0 <= green <= 1
   * @param {number} [b=0] 0 <= blue <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number]} [0 <= hue < 360, 0 <= saturation <= 1, 0 <= light <= 1]
   */
  static _RGBtoHSL(r = 0, g = 0, b = 0, arr = []) {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    const l = (max + min) / 2
    let h = 0
    let s = 0
    if (delta !== 0) {
      switch (max) {
        case r:
          h = 60 * ((g - b) / delta % 6)
          break
        case g:
          h = 60 * ((b - r) / delta + 2)
          break
        case b:
          h = 60 * ((r - g) / delta + 4)
          break
      }

      s = delta / (1 - Math.abs(2 * l - 1))
    }

    arr[0] = h < 0 ? h + 360 : h
    arr[1] = s
    arr[2] = l

    return arr
  }

  /**
   * @returns {[number, number, number]} [0 <= hue < 360, 0 <= saturation <= 1, 0 <= light <= 1]
   */
  get hsl() {
    const rgb = this.rgb
    return Color._RGBtoHSL(rgb[0], rgb[1], rgb[2])
  }

  /**
   * Converts cmyk values to rgb values.
   * 
   * @param {number} [c=0] 0 <= cyan <= 1
   * @param {number} [m=0] 0 <= magenta <= 1
   * @param {number} [y=0] 0 <= yellow <= 1
   * @param {number} [k=0] 0 <= black <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number]} [0 <= red <= 1, 0 <= green <= 1, 0 <= blue <= 1]
   */
  static _CMYKtoRGB(c = 0, m = 0, y = 0, k = 0, arr = []) {
    arr[0] = (1 - c) * (1 - k)
    arr[1] = (1 - m) * (1 - k)
    arr[2] = (1 - y) * (1 - k)

    return arr
  }

  /**
   * @param {[number, number, number, number]} cmyk [0 <= cyan <= 1, 0 <= magenta <= 1, 0 <= yellow <= 1, 0 <= black <= 1]
   */
  set cmyk(cmyk) {
    if (cmyk instanceof Array) {
      this.rgb = Color._CMYKtoRGB(cmyk[0] ?? 0, cmyk[1] ?? 0, cmyk[2] ?? 0, cmyk[3] ?? 0)
    }
  }

  /**
   * Converts rgb values to cmyk values.
   * 
   * @param {number} [r=0] 0 <= red <= 1
   * @param {number} [g=0] 0 <= green <= 1
   * @param {number} [b=0] 0 <= blue <= 1
   * @param {number[]} [arr=[]] output array
   * @returns {[number, number, number, number]} [0 <= cyan <= 1, 0 <= magenta <= 1, 0 <= yellow <= 1, 0 <= black <= 1]
   */
  static _RGBtoCMYK(r = 0, g = 0, b = 0, arr = []) {
    const max = Math.max(r, g, b)

    arr[0] = max - r
    arr[1] = max - g
    arr[2] = max - b
    arr[3] = 1 - max

    if (max !== 0) {
      arr[0] /= max
      arr[1] /= max
      arr[2] /= max
    }

    return arr
  }

  /**
   * @returns {[number, number, number, number]} [0 <= cyan <= 1, 0 <= magenta <= 1, 0 <= yellow <= 1, 0 <= black <= 1]
   */
  get cmyk() {
    const rgb = this.rgb
    return Color._RGBtoCMYK(rgb[0], rgb[1], rgb[2])
  }

  /**
   * Returns rgb string format of color where values are between 0 and 255.
   * 
   * @returns {string} rgb(red, green, blue)
   */
  toRGBString() {
    const red = Math.round(this.red * 255)
    const green = Math.round(this.green * 255)
    const blue = Math.round(this.blue * 255)
    return `rgb(${red}, ${green}, ${blue})`
  }

  /**
   * Returns a color from the rgb string format where values are between 0 and 255.
   * 
   * @param {string} str rgb(red, green, blue)
   * @returns {Color} the color, black if not a valid string
   */
  static FromRGBString(str) {
    if (typeof str !== 'string') return new Color(0, 0, 0)
    let r = 0, g = 0, b = 0
    let m
    if (m = str.match(/\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/)) {
      r = Color._clamp(parseInt(m[1]) / 255)
      g = Color._clamp(parseInt(m[2]) / 255)
      b = Color._clamp(parseInt(m[3]) / 255)
    }
    return new Color(r, g, b)
  }

  /**
   * Returns hex string format of color where values are between 0x00 and 0xFF.
   * 
   * @returns {string} #RRGGBB
   */
  toHexString() {
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

  /**
   * Returns a color from the hex string format where values are between 0x00 and 0xFF.
   * Hashtag is optional. If there is only one hex digit for the color, the color is repeated.
   * #DA0 is expanded to #DDAA00.
   * 
   * @param {string} str #RRGGBB, RRGGBB, #RGB, or RGB
   * @returns {Color} the color, black if not a valid string
   */
  static FromHexString(str) {
    if (typeof str !== 'string') return new Color(0, 0, 0)

    let r = 0, g = 0, b = 0
    let rs = '00', gs = '00', bs = '00'

    str = str.trim()
    if (str.startsWith('#')) str = str.substring(1)
    if (str.length === 6) {
      rs = str.substring(0, 2)
      gs = str.substring(2, 4)
      bs = str.substring(4, 6)
    } else if (str.length === 3) {
      rs = str[0] + str[0]
      gs = str[1] + str[1]
      bs = str[2] + str[2]
    }

    r = parseInt(rs, 16) / 255
    g = parseInt(gs, 16) / 255
    b = parseInt(bs, 16) / 255

    if (!isFinite(r)) r = 0
    if (!isFinite(g)) g = 0
    if (!isFinite(b)) b = 0

    return new Color(r, g, b)
  }

  /**
   * Returns hsv string format of color where hue is between 0 and 360,
   * saturation and value are between 0 and 1.
   * 
   * @param {boolean} [includeDegrees=false] include the degrees symbol in the output
   * @returns {string} hsv(hue°, saturation%, value%)
   */
  toHSVString(includeDegrees = false) {
    const [h, s, v] = this.hsv
    const hf = Math.round(h) % 360
    const sf = Math.floor(s * 100)
    const vf = Math.floor(v * 100)
    return `hsv(${hf}${includeDegrees ? '°' : ''}, ${sf}%, ${vf}%)`
  }

  /**
   * Returns a color from the hsv string format where hue is between 0 and 360,
   * saturation and value are between 0 and 1. Degrees and percentage symbols
   * are optional.
   * 
   * @param {string} str hsv(hue°, saturation%, value%)
   * @returns {Color} the color, black if not a valid string
   */
  static FromHSVString(str) {
    if (typeof str !== 'string') return new Color(0, 0, 0)
    let h = 0, s = 0, v = 0
    let m
    if (m = str.match(/\s*hsv\s*\(\s*(\d+)°?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)\s*$/)) {
      h = parseInt(m[1]) % 360
      s = parseInt(m[2]) / 100
      v = parseInt(m[3]) / 100
    }
    const color = new Color()
    color.hsv = [h, s, v]
    return color
  }

  /**
   * Returns hsl string format of color where hue is between 0 and 360,
   * saturation and light are between 0 and 1.
   * 
   * @param {boolean} [includeDegrees=false] include the degrees symbol in the output
   * @returns {string} hsv(hue°, saturation%, light%)
   */
  toHSLString(includeDegrees = false) {
    const [h, s, l] = this.hsl
    const hf = Math.round(h) % 360
    const sf = Math.floor(s * 100)
    const lf = Math.floor(l * 100)
    return `hsl(${hf}${includeDegrees ? '°' : ''}, ${sf}%, ${lf}%)`
  }

  /**
   * Returns a color from the hsl string format where hue is between 0 and 360,
   * saturation and light are between 0 and 1. Degrees and percentage symbols
   * are optional.
   * 
   * @param {string} str hsl(hue°, saturation%, light%)
   * @returns {Color} the color, black if not a valid string
   */
  static FromHSLString(str) {
    if (typeof str !== 'string') return new Color(0, 0, 0)
    let h = 0, s = 0, l = 0
    let m
    if (m = str.match(/\s*hsl\s*\(\s*(\d+)°?\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)\s*$/)) {
      h = parseInt(m[1]) % 360
      s = parseInt(m[2]) / 100
      l = parseInt(m[3]) / 100
    }
    const color = new Color()
    color.hsl = [h, s, l]
    return color
  }

  /**
   * Returns cmyk string format of color where cyan, magenta, yellow, and black
   * values are between 0 and 100.
   * 
   * @returns {string} cmyk(cyan%, magenta%, yellow%, black%)
   */
  toCMYKString() {
    const [c, m, y, k] = this.cmyk
    const cf = Math.floor(c * 100)
    const mf = Math.floor(m * 100)
    const yf = Math.floor(y * 100)
    const kf = Math.floor(k * 100)
    return `cmyk(${cf}%, ${mf}%, ${yf}%, ${kf}%)`
  }

  /**
   * Returns a color from the cmyk string format where cyan, magenta, yellow, and black
   * values are between 0 and 100.
   * 
   * @param {string} str cmyk(cyan%, magenta%, yellow%, black%)
   * @returns {Color} the color, black if not a valid string
   */
  static FromCMYKString(str) {
    let cyan = 0, magenta = 0, yellow = 0, black = 0
    let m
    if (m = str.match(/\s*cmyk\s*\(\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)\s*$/)) {
      cyan = parseInt(m[1]) / 100
      magenta = parseInt(m[2]) / 100
      yellow = parseInt(m[3]) / 100
      black = parseInt(m[4]) / 100
    }
    const color = new Color()
    color.cmyk = [cyan, magenta, yellow, black]
    return color
  }

  /**
   * Creates a wrapper for hsv values that allows individual getting and setting
   * of each value.
   * 
   * @returns the wrapper object
   */
  getHSVWrapper() {
    const color = this
    const obj = {}
    Object.defineProperty(obj, 'h', {
      get: () => color.hsv[0],
      set: h => {
        const copy = color.hsv
        copy[0] = h
        color.hsv = copy
      }
    })
    Object.defineProperty(obj, 's', {
      get: () => color.hsv[1],
      set: s => {
        const copy = color.hsv
        copy[1] = s
        color.hsv = copy
      }
    })
    Object.defineProperty(obj, 'v', {
      get: () => color.hsv[2],
      set: v => {
        const copy = color.hsv
        copy[2] = v
        color.hsv = copy
      }
    })
    return obj
  }

  /**
   * Creates a wrapper for hsl values that allows individual getting and setting
   * of each value.
   * 
   * @returns the wrapper object
   */
  getHSLWrapper() {
    const color = this
    const obj = {}
    Object.defineProperty(obj, 'h', {
      get: () => color.hsl[0],
      set: h => {
        const copy = color.hsl
        copy[0] = h
        color.hsl = copy
      }
    })
    Object.defineProperty(obj, 's', {
      get: () => color.hsl[1],
      set: s => {
        const copy = color.hsl
        copy[1] = s
        color.hsl = copy
      }
    })
    Object.defineProperty(obj, 'l', {
      get: () => color.hsl[2],
      set: l => {
        const copy = color.hsl
        copy[2] = l
        color.hsl = copy
      }
    })
    return obj
  }

  /**
   * Creates a wrapper for cmyk values that allows individual getting and setting
   * of each value.
   * 
   * @returns the wrapper object
   */
  getCMYKWrapper() {
    const color = this
    const obj = {}
    Object.defineProperty(obj, 'c', {
      get: () => color.cmyk[0],
      set: c => {
        const copy = color.cmyk
        copy[0] = c
        color.cmyk = copy
      }
    })
    Object.defineProperty(obj, 'm', {
      get: () => color.cmyk[1],
      set: m => {
        const copy = color.cmyk
        copy[1] = m
        color.cmyk = copy
      }
    })
    Object.defineProperty(obj, 'y', {
      get: () => color.cmyk[2],
      set: y => {
        const copy = color.cmyk
        copy[2] = y
        color.cmyk = copy
      }
    })
    Object.defineProperty(obj, 'k', {
      get: () => color.cmyk[3],
      set: k => {
        const copy = color.cmyk
        copy[3] = k
        color.cmyk = copy
      }
    })
    return obj
  }
}