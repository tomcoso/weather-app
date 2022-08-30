const keyframes = [
  {
    width: 0,
    height: 0,
    opacity: 0,
    offset: 0,
  },
  {
    width: 0,
    height: 0,
    opacity: 0,
    offset: 0.049,
  },
  {
    width: '6px',
    height: '6px',
    opacity: 1,
    offset: 0.05,
  },
  {
    width: '72px',
    height: '72px',
    opacity: 0,
    offset: 1,
  },
]
const first = document.querySelector('.lds-ripple > div')
const second = document.querySelector('.lds-ripple div:nth-child(2)')
const animationFirst = new Animation(
  new KeyframeEffect(first, keyframes, {
    duration: 1000,
    iterations: Infinity,
    easing: 'cubic-bezier(0, 0.2, 0.8, 1)',
  })
)
const animationSecond = new Animation(
  new KeyframeEffect(second, keyframes, {
    duration: 1000,
    iterations: Infinity,
    easing: 'cubic-bezier(0, 0.2, 0.8, 1)',
    delay: 500,
  })
)

const play = function () {
  let panel = document.querySelector('#loading-screen')
  panel.removeAttribute('style', 'display: none')
  animationFirst.play()
  animationSecond.play()
}
const stop = function () {
  let panel = document.querySelector('#loading-screen')
  panel.setAttribute('style', 'display: none')
  animationFirst.pause()
  animationSecond.pause()
}
export default { play, stop }
