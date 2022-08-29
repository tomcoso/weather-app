import forest from './assets/forest.jpg'
import apartments from './assets/apartments.jpg'
import car from './assets/car.jpg'
import city from './assets/city.jpg'
import coffee from './assets/coffee.jpg'
import sunset from './assets/sunset.jpg'
import window from './assets/window.jpg'

const backgrounds = [forest, apartments, car, city, coffee, sunset, window]

const pickBg = function () {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)]
}

export default pickBg
