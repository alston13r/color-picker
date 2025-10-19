const picker = new ColorPicker('#target')

picker.addEventListener('colorchange', e => {
  console.log(e.detail.color)
})