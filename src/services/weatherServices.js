import { DateTime } from 'luxon'

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API;
const BASE_URL = import.meta.env.VITE_OPENWEATHERMAP_BASE_URL;

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    return fetch(url).then((res) => res.json())
};


//to format the current weather data via destructuring

const formatCurrentWeather = (data) => {

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data


    const { main: details, icon } = weather[0];

    return {
        lat, lon, temp, feels_like, temp_min, temp_max,
        humidity, name, dt, country, sunrise, sunset, details, icon, speed
    }
}

//End of formating current weather data


//formating the forcast weather (daily,hourly)

const formatForcastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })
    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, daily, hourly }
}

//End for formating forcast weather


// Function for calling the above three functions for getting structured data of weather

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData
        ('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather

    const formattedForcastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForcastWeather)

    return { ...formattedCurrentWeather, ...formattedForcastWeather }
}

//end of major function


//function for converting the time stamp

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).
    setZone(zone).toFormat(format);

//end of function


const iconUrlFromCode = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`


export default getFormattedWeatherData;

export { iconUrlFromCode, formatToLocalTime }