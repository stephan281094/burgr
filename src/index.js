require('./scss/index.scss')

var menuClass = 'o-burgr__menu'
var button = document.querySelector('.o-burgr__switch')
var overlay = document.querySelectorAll('.o-burgr__overlay:not(.o-burgr__menu)')[0]
var content = document.querySelector('.o-burgr__content')
var menu = document.querySelector('.' + menuClass)
var openClass = 'o-burgr__overlay--visible'

overlay.addEventListener('click', function (evt) {
  if (evt.target.classList.contains(menuClass)) return

  overlay.classList.remove(openClass)
})

button.addEventListener('click', function (evt) {
  overlay.classList.toggle(openClass)
})
