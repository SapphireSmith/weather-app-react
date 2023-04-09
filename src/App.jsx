import React from 'react'
import NavButtons from './components/NavButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemparatureAndDetails from './components/TemparatureAndDetails'
import Forcast from './components/Forcast'
import getFormattedWeatherData from './services/weatherServices'

const App = () => {

  const fetchWeather = async ()=>{
    const data = await getFormattedWeatherData({q:'Kollam'})
    console.log(data);
  }

  fetchWeather()

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5  px-32
    bg-gradient-to-br from-cyan-700 to-blue-700
    h-fit shadow-md shadow-gray-500'>
      <NavButtons/>
      <Inputs/>

      <TimeAndLocation/>
      <TemparatureAndDetails/>

      <Forcast title="Hourly Forcast"/>
      <Forcast title="Daily Forcast"/>
    </div>
  )
}

export default App