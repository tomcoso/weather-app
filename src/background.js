import forest from './assets/forest.jpg'
import apartments from './assets/apartments.jpg'
import skyline from './assets/skyline.jpg'
import city from './assets/city.jpg'
import coffee from './assets/coffee.jpg'
import sunset from './assets/sunset.jpg'
import concrete from './assets/concrete.jpg'

const backgrounds = [
  forest,
  apartments,
  skyline,
  city,
  coffee,
  sunset,
  concrete,
]

const pickBg = function () {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

export default pickBg
