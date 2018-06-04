import axios from 'axios';


const API_KEY = '9c27cc66ca59710582f9e12b812cd521';  // Open Weather Maps Api Key

// This is yet another ES6 template string example
// Same thing as writing: http://samples.openweathermap.org/data/2.5/forecast?appid= + API_KEY
const ROOT_URL = `http://samples.openweathermap.org/data/2.5/forecast?appid=${ API_KEY }`; 


export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city, country_code) // For some reason Stephen Grider prefers to make Action Creators start with lower letter.
{
    const url = `${ ROOT_URL }&q=${ city },${ country_code }`; // the & extends this ES6 syntax, same function as with if statements
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}