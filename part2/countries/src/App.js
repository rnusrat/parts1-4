import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [weather, setWeather] = useState([])
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    if (filterName !== '') {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [filterName])

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const showCountry = (name) => {
    setFilterName(name)
  }

  useEffect(() => {
    if (lat != '' && lng != '') {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [lat, lng])

  const Weather = ({ lat, lng }) => {
    setLat(lat)
    setLng(lng)
    if (weather.main && weather.weather && weather.wind) {
      return (
        <div>
          <div> temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celcius </div>
          {weather.weather[0] && (<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt='new' />)}
          <div> wind {weather.wind.speed} m/s </div>
        </div>
      )
    }
  }

  const Countries = () => {
    if (filterName === '' || countries.length === 0) {
      return null
    }
    const filteredCountries = countries.filter(country =>
      country.name.common.toUpperCase().includes(filterName.toUpperCase()))
    if (filteredCountries.length === 0) {
      return null
    }
    else if (filteredCountries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if (filteredCountries.length === 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              <h1> {country.name.common} </h1>
              <div> capital {country.capital} </div>
              <div> area {country.area} </div>
              <h3> languages: </h3>
              <p> {Object.values(country.languages).map(language => <li>{language}</li>)} </p>
              <img src={country.flags.png}
                alt='new' />
              <h2> Weather in {country.name.common} </h2>
              <Weather lat={country.latlng[0]} lng={country.latlng[1]} />
            </div>
          ))}
        </div>
      )
    }
    else {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button type="submit" onClick={() => showCountry(country.name.common)}>show</button>
            </div>
          ))}
        </div>
      )
    }

  }

  return (
    <div>
      find countries: <input value={filterName}
        onChange={handleFilterNameChange} />
      <Countries />
    </div>
  )
}


export default App;
