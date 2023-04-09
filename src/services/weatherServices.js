import { DateTime } from 'luxon'
const API_KEY = 'dd3221923501553907586696f510e6ca';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    console.log(url);
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
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })
}

//End for formating forcast weather

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData
        ('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather
    console.log(formattedCurrentWeather);

    // const formattedForcastWeather = await getWeatherData('onecall', {
    //     lat,
    //     lon,
    //     exclude: "current,minutely,alerts",
    //     units: searchParams.units,
    // }).then(formatForcastWeather)
    return { formattedCurrentWeather }
}

const formatToLocalTime = (secs, zone, format = "cccc, dd lll yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).
    setZone(zone).toFormat(format);


export default getFormattedWeatherData;