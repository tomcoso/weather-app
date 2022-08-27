import './style.css'
import getWeather from './weather'
import owIcon from './assets/openweather-logo.png'
import { add, format } from 'date-fns'

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
}

getWeather('london').then((res) => render(res))
dom.openweather.src = owIcon

dom.searchBtn.addEventListener('click', () => {
  let place = dom.searchInput.value.split(' ').join('')
  if (place) {
    getWeather(place).then(
      (data) => {
        dom.searchInput.value = ''
        render(data)
      },
      (err) => {
        console.log(err)
      }
    )
  } else {
    console.log('Write a city')
  }
})
dom.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let place = dom.searchInput.value.split(' ').join('')
    if (place) {
      getWeather(place).then(
        (data) => {
          dom.searchInput.value = ''
          render(data)
        },
        (err) => {
          console.log(err)
        }
      )
    } else {
      console.log('Write a city')
    }
  }
})

const render = function (data) {
  const currentDate = new Date()
  dom.time.textContent = format(
    add(currentDate, {
      minutes: currentDate.getTimezoneOffset() + data.timezone / 60,
    }),
    'E, LLLL do, haaa'
  )
  dom.locationName.textContent = data.name
  dom.temp.textContent = `${data.main.temp} °C`
  dom.sky.textContent =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1)
  dom.humidity.textContent = `Humidity: ${data.main.humidity}%`
  dom.wind.textContent = `Wind: ${data.wind.speed}m/s`
}
