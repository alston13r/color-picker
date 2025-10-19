# Color Picker
Color Picker modeled after Google's color picker.

## Demo
See [https://alston13r.github.io/color-picker/](https://alston13r.github.io/color-picker/) for a live demo.

## Getting started
Download the source files and add the style and scripts to your page:
```html
<link rel='stylesheet' href='./color-picker.css'>
<script src='./Color.js'></script>
<script src='./ColorPicker.js'></script>
```
### Usage
The `ColorPicker` is constructed with a target element as the parameter. This can be an `HTMLElement` or a query selector.

```javascript
// HTMLElement as target
const colorPicker = new ColorPicker(document.body)

// query selector as target
const colorPicker = new ColorPicker('#target')
```

`ColorPicker` has a custom event for color changes, `colorchange`. The color parameter is an instance of the `Color` class.

```javascript
colorPicker.addEventListener('colorchange', e => {
  console.log(e.detail.color)
})
```

`ColorPicker` has methods for getting and setting the current color.

```javascript
// set color to `coral` #ff7f50
colorPicker.setColor(Color.FromNamed('coral'))

// currentColor is a copy of `coral` #ff7f50
const currentColor = colorPicker.getColor()
```