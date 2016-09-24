require('./scss/index.scss')

var menu = document.querySelector('.o-burgr__menu')
var overlay = document.querySelector('.o-burgr__overlay')
var container = document.querySelector('.o-burgr__container')
var button = document.querySelector('.o-burgr__switch')
var isOpen = false

window.onload = function () {
  // Touch support
  var containerWidth = container.getBoundingClientRect().width
  var menuWidth = menu.getBoundingClientRect().width
  var containerX  = container.offsetLeft

  container.addEventListener('touchstart', startDrag)
  container.addEventListener('touchmove', drag)
  container.addEventListener('touchend', endDrag)
  container.addEventListener('click', click)
  button.addEventListener('click', open)
  menu.addEventListener('click', function (e) { e.stopPropagation() })

  function open () {
    animateContainerLeft(-menuWidth, 0, 350)
    animateLayoutOpacity(0, 1)
    isOpen = true
  }

  function close () {
    animateContainerLeft(0, -menuWidth, 350)
    animateLayoutOpacity(1, 0)
    isOpen = false
  }

  function startDrag (evt) {
    containerX = evt.changedTouches[0].pageX - container.offsetLeft
  }

  function drag (evt) {
    var pageX = evt.changedTouches[0].pageX
    var newLeft = pageX - containerX

    if (newLeft >= 0) {
      newLeft = 0
    } else if (newLeft <= -menuWidth) {
      newLeft = -menuWidth
    }

    container.style.left = newLeft + 'px'
    overlay.style.opacity = 1 - (newLeft / menuWidth * -1)
  }

  function endDrag (evt) {
    var border = -((1 - 0.5) * containerWidth)

    // If user dragged beyond 'border'
    if (parseFloat(container.style.left, 10) > border) {
      animateContainerLeft(parseFloat(container.style.left, 10), 0)
      animateLayoutOpacity(parseFloat(overlay.style.opacity, 10), 1)
      isOpen = true
    } else {
      animateContainerLeft(parseFloat(container.style.left, 10), -menuWidth)
      animateLayoutOpacity(parseFloat(overlay.style.opacity, 10), 0)
      isOpen = false
    }
  }

  function click (evt) {
    if (isOpen) {
      animateContainerLeft(parseFloat(container.style.left, 10), -menuWidth, 350)
      animateLayoutOpacity(parseFloat(overlay.style.opacity, 10), 0, 350)

      isOpen = false
    }
  }

  // Animations
  function animateContainerLeft (from, to, duration) {
    var duration = duration || 250
    var start    = new Date().getTime()

    var timer = setInterval(function () {
      var time = new Date().getTime() - start
      var left = easeInOutQuart(time, from, to - from, duration)
      container.style.left = left + 'px'
      if (time >= duration) clearInterval(timer)
    }, 1000 / 60)
  }

  function animateLayoutOpacity (from, to, duration) {
    var duration = duration || 250
    var start    = new Date().getTime()

    var timer = setInterval(function () {
      var time = new Date().getTime() - start
      var opacity = easeInOutQuart(time, from, to - from, duration)
      overlay.style.opacity = opacity;
      if (time >= duration) clearInterval(timer)
    }, 1000 / 60)
  }

  function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
}
