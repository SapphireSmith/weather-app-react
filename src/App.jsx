import React, { useEffect, useState } from 'react'
import NavButtons from './components/NavButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemparatureAndDetails'
import Forecast from './components/Forcast'
import getFormattedWeatherData from './services/weatherServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [query, setQuery] = useState({ q: 'Kozhikode' })
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q+'.':"current location."
      toast.info('featching weather for '+message )
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data);
      })
    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700"

    const threshold = units === "metric" ? 40 : 50;

    console.log(weather.temp);
    console.log(weather.temp <= threshold);
    if (weather.temp <= threshold)
      return "from-cyan-700 to-blue-700"

    return "from-yellow-700 to-orange-700"
  }






  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5  px-32
    bg-gradient-to-br h-fit shadow-md shadow-gray-500 ${formatBackground()}`}>
      <NavButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} unit={units} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>

    </div >
  )
}

export default App