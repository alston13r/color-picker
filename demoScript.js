const colorPicker = new ColorPicker('#target')

colorPicker.addEventListener('colorchange', e => {
  console.log(e.detail.color)
})