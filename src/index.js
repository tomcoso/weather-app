import './style.css'
import getWeather from './weather'
import owIcon from './assets/openweather-logo.png'
import { add, format } from 'date-fns'
import pickBg from './background'

const dom = {
  page: document.querySelector('#page-wrap'),
  searchInput: document.querySelector('#search-panel > input'),
  searchBtn: document.querySelector('#search-panel > button'),
  openweather: document.querySelector('footer > div img'),
  locationName: document.querySelector('#location-name'),
  temp: document.querySelector('#temp'),
  sky: document.querySelector('#sky'),
  humidity: document.querySelector('#humidity'),
  time: document.querySelector('#time'),
  wind: document.querySelector('#wind'),
  errormsg: document.querySelector('#error-msg'),
  visibility: document.querySelector('#visibility'),
  feelsLike: document.querySelector('#feels-like'),
}

getWeather('london').then((res) => render(res))
dom.openweather.src = owIcon

const search = function (e) {
  if (e.key === 'Enter' || e.type === 'click') {
    let place = dom.searchInput.value.split(' ').join('')
    if (place) {
      getWeather(place).then(
        (data) => {
          dom.searchInput.value = ''
          render(data)
        },
        (err) => {
          console.log(err)
          dom.errormsg.animate(
            [
              { opacity: 0 },
              { opacity: 1, offset: 0.2 },
              { opacity: 1, offset: 1 },
            ],
            {
              direction: 'alternate',
              iterations: 2,
              easing: 'ease-in-out',
              duration: 1000,
            }
          )
        }
      )
    } else {
      console.log('Write a city')
    }
  }
}

dom.searchBtn.addEventListener('click', search)
dom.searchInput.addEventListener('keydown', search)

const render = function (data) {
  const currentDate = new Date()
  dom.page.removeAttribute('style')
  dom.page.setAttribute('style', `background-image: url(${pickBg()})`)
  dom.time.textContent = format(
    add(currentDate, {
      minutes: currentDate.getTimezoneOffset() + data.timezone / 60,
    }),
    'E, LLLL do, haaa'
  )
  dom.locationName.textContent = `${data.name}, ${data.sys.country}`
  dom.temp.textContent = `${data.main.temp} °C`
  dom.sky.textContent =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1)
  dom.humidity.textContent = `${data.main.humidity}% humidity`
  dom.wind.textContent = `${(data.wind.speed * 3.6).toFixed(1)}km/h`
  dom.visibility.textContent = `${(data.visibility / 1000).toFixed(
    1
  )}km visibility`
  dom.feelsLike.textContent = `Feels like ${data.main.feels_like} °C`
}
