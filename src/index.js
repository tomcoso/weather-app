import './style.css'

const dom = (function () {
  const body = document.querySelector('body')
  const searchInput = document.querySelector('#search-panel > input')
  const searchBtn = document.querySelector('#search-panel > button')

  return { body, searchInput, searchBtn }
})()

const getCoords = async function (place) {
  try {
    let geoResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q={${place}}&limit=1&appid=4c25d4f0de62c8a1709a0fbc0aeb4f95`,
      { mode: 'cors' }
    )
    let coords = await geoResponse.json()
    // console.log(coords)
    return coords
  } catch (error) {
    console.log(error)
    return error
  }
}

const request = async function (coords) {
  try {
    let weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&units=metric&appid=4c25d4f0de62c8a1709a0fbc0aeb4f95`,
      { mode: 'cors' }
    )
    let weatherData = await weatherResponse.json()
    weatherData.name = coords[0].name
    // console.log(weatherData)
    return weatherData
  } catch (error) {
    if (coords.length === 0) {
      return Promise.reject('Could not find location')
    } else {
      console.log(error)
      return error
    }
  }
}

const getWeather = async function (place) {
  const coords = await getCoords(place)
  const rawData = await request(coords)
  console.log(rawData)
  return rawData
}
getWeather('london')

dom.searchBtn.addEventListener('click', () => {
  let place = dom.searchInput.value.split(' ').join('')
  if (place) {
    getWeather(place).then(
      () => {
        dom.searchInput.value = ''
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
        () => {
          dom.searchInput.value = ''
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
