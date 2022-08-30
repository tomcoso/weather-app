const getCoords = async function (place) {
  try {
    let geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q={${place}}&limit=1&appid=4c25d4f0de62c8a1709a0fbc0aeb4f95`,
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

const request = async function (coords, unit) {
  try {
    let weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0].lat}&lon=${coords[0].lon}&units=${unit}&appid=4c25d4f0de62c8a1709a0fbc0aeb4f95`,
      { mode: 'cors' }
    )
    let weatherData = await weatherResponse.json()
    unit === 'metric' ? (weatherData.unit = '°C') : (weatherData.unit = '°F')
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
const getForecast = async function (coords) {
  try {
    let forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0].lat}&lon=${coords[0].lon}&unnits=metric&appid=4c25d4f0de62c8a1709a0fbc0aeb4f95`,
      { mode: 'cors' }
    )
    let forecast = await forecastResponse.json()
    return forecast
  } catch {
    console.log(error)
    return error
  }
}

const getWeather = async function (place, unit) {
  const coords = await getCoords(place)
  const rawData = await request(coords, unit)
  const forecast = await getForecast(coords)
  rawData.forecast = forecast
  console.log(rawData)
  return rawData
}

export default getWeather
