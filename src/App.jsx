import React, { useEffect, useState } from 'react'
import NavButtons from './components/NavButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemparatureAndDetails'
import Forecast from './components/Forcast'
import getFormattedWeatherData from './services/weatherServices'

const App = () => {

  const [query, setQuery] = useState({ q: 'Kozhikode' })
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        console.log(data);
      })
    }
    fetchWeather()
  }, [query, units])





  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5  px-32
    bg-gradient-to-br from-cyan-700 to-blue-700
    h-fit shadow-md shadow-gray-500'>
      <NavButtons />
      <Inputs />

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TemperatureAndDetails weather={weather}/>

          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily}/>
        </div>
      )}


    </div >
  )
}

export default App