import './style.css'
import getWeather from './weather'
import owIcon from './assets/openweather-logo.png'
import git from './assets/GitHub-Mark-Light-32px.png'
import { add, format } from 'date-fns'
import pickBg from './background'
import searchIcon from './assets/search.svg'
import load from './animation'
import { resolveConfig } from 'prettier'

const dom = {
  page: document.querySelector('#page-wrap'),
  searchInput: document.querySelector('#search-input > input'),
  searchBtn: document.querySelector('#search-input > button'),
  searchInputWrap: document.querySelector('#search-input'),
  openweather: document.querySelector('footer > div > a > img'),
  locationName: document.querySelector('#location-name'),
  temp: document.querySelector('#temp'),
  description: document.querySelector('#description'),
  humidity: document.querySelector('#humidity'),
  time: document.querySelector('#time'),
  wind: document.querySelector('#wind'),
  errormsg: document.querySelector('#error-msg'),
  visibility: document.querySelector('#visibility'),
  git: document.querySelector('footer > a > img'),
  searchPop: document.querySelector('#search-pop > img'),
  pop: document.querySelector('#pop'),
  minmaxtemp: document.querySelector('#min-max-temp'),
  unitSelect: document.querySelector('#unit-select'),
}

const getWeatherWrap = async function (location, unit) {
  load.play()
  let status
  await getWeather(location, unit)
    .then((res) => {
      render(res)
      status = true
    })
    .catch((err) => {
      load.stop()
      console.log(err)
      dom.errormsg.animate(
        [
          { opacity: 0 },
          { opacity: 1, offset: 0.1 },
          { opacity: 1, offset: 1 },
        ],
        {
          direction: 'alternate',
          iterations: 2,
          easing: 'ease-in-out',
          duration: 1000,
        }
      )
      status = false
    })
  if (status) {
    return Promise.resolve('Success!')
  } else {
    return false
  }
}

const search = function (e) {
  if (e.key === 'Enter' || e.type === 'click') {
    let place = dom.searchInput.value.split(' ').join('')
    if (place) {
      getWeatherWrap(place, currentUnit).then((res) => {
        if (res) {
          dom.searchInput.value = ''
          searchAnimation.reverse()
        }
      }),
        (err) => console.log(err)
    } else {
      console.log('Write a city')
    }
  }
}

const render = function (data) {
  load.stop()
  const currentDate = new Date()
  const unit = data.unit

  let windSpeed
  if (data.unit === '°C') {
    windSpeed = `${(data.wind.speed * 3.6).toFixed(1)}km/h`
  } else {
    windSpeed = `${data.wind.speed}mph`
  }

  dom.page.removeAttribute('style')

  dom.page.setAttribute('style', `background-image: url(${pickBg()})`)

  dom.time.textContent = format(
    add(currentDate, {
      minutes: currentDate.getTimezoneOffset() + data.timezone / 60,
    }),
    'E, LLLL do, haaa'
  )

  dom.locationName.textContent = `${data.name}, ${data.sys.country}`

  dom.temp.textContent = `${data.main.temp.toFixed(1)} ${unit}`

  dom.description.innerHTML = `${
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1)
  }. <br> Feels like ${data.main.feels_like.toFixed(1)} ${unit}`

  dom.pop.textContent = `${data.forecast.list[0].pop * 100}% Chance of rain`

  dom.humidity.textContent = `${data.main.humidity}% Humidity`

  dom.wind.textContent = windSpeed

  dom.visibility.textContent = `${(data.visibility / 1000).toFixed(
    1
  )}km Visibility`

  dom.minmaxtemp.innerHTML = `Min ${data.main.temp_min.toFixed(
    1
  )} ${unit}<br>Max ${data.main.temp_max.toFixed(1)} ${unit}`
}

const searchAnimation = new Animation(
  new KeyframeEffect(
    dom.searchInputWrap,
    [
      { top: '0%', opacity: 0, offset: 0 },
      { top: '-150%', opacity: 1, 'z-index': 2, offset: 1 },
    ],
    {
      duration: 300,
      direction: 'alternate',
      iterations: 1,
      easing: 'linear',
      fill: 'forwards',
    }
  )
)

dom.searchPop.addEventListener('click', () => {
  if (searchAnimation.playState === 'finished') {
    searchAnimation.reverse()
  } else {
    searchAnimation.play()
  }
})

let currentUnit = 'metric'
dom.unitSelect.addEventListener('click', function () {
  if (this.textContent === '°C') {
    currentUnit = 'imperial'
    this.textContent = '°F'
  } else if (this.textContent === '°F') {
    currentUnit = 'metric'
    this.textContent = '°C'
  }
  getWeatherWrap(dom.locationName.textContent, currentUnit)
})

getWeatherWrap('buenos aires', currentUnit)
dom.openweather.src = owIcon
dom.git.src = git
dom.searchPop.src = searchIcon

dom.searchBtn.addEventListener('click', search)
dom.searchInput.addEventListener('keydown', search)
