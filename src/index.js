require('./scss/index.scss')

var menuClass = 'o-burgr__menu'
var button = document.querySelector('.o-burgr__switch')
// var overlay = document.querySelectorAll('.o-burgr__overlay:not(.o-burgr__menu)')[0]
var content = document.querySelector('.o-burgr__content')
var menu = document.querySelector('.' + menuClass)
var openClass = 'o-burgr__overlay--open'
var container = document.querySelector('.o-burgr__container')

// overlay.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains(menuClass)) return

//   overlay.classList.remove(openClass)
// })

// button.addEventListener('click', function (evt) {
//   overlay.classList.toggle(openClass)
// })


window.onload = function () {
  // Make overlay visible via JS, to prevent seeing the menu upon loading the page
  // overlay.classList.add('o-burgr__overlay--visible')



  // Touch support
  var containerWidth = container.getBoundingClientRect().width
  var menuWidth = menu.getBoundingClientRect().width
  var containerX  = container.offsetLeft

  container.addEventListener('touchstart', startDrag)
  container.addEventListener('touchmove', drag)
  container.addEventListener('touchend', endDrag)

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
  }

  function endDrag (evt) {
    var border = -((1 - 0.5) * containerWidth)

    if (parseFloat(container.style.left, 10) > border) {
      animateLeft(parseFloat(container.style.left, 10), 0)
    } else {
      animateLeft(parseFloat(container.style.left, 10), -menuWidth)
    }
  }

  // Animations
  function animateLeft (from, to) {
    var duration = 250
    var start    = new Date().getTime()

    var timer = setInterval(function () {
      var time = new Date().getTime() - start
      var left = easeInOutQuart(time, from, to - from, duration)
      container.style.left = left + 'px'
      if (time >= duration) clearInterval(timer);
    }, 1000 / 60)
  }

  //
  // http://easings.net/#easeInOutQuart
  //  t: current time
  //  b: beginning value
  //  c: change in value
  //  d: duration
  //
  function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
}
