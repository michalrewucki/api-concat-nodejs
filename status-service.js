import fetch from "node-fetch";
import apiConfigs from "./api-configs.json";

async function getCityStatus(cityName) {
    let geoDataPromise = getGeoData(cityName);
    let weatherPromise = getWeather(cityName);
    let airQualityPromise = getAirQuality(cityName);
    let responses = await Promise.all([geoDataPromise, weatherPromise, airQualityPromise]);
    return {
        'cityName': cityName,
        'weather': mapWeather(responses[1]),
        'airQuality': mapAirQuality(responses[2]),
        'geoData': mapGeoData(responses[0])
    };
}

function mapGeoData(geoDataResponse) {
    const result = geoDataResponse.results[0];
    return {
        'geometry': result.geometry,
        'bounds': result.bounds,
        'components': result.components
    }
}

function mapAirQuality(airQualityResponse) {
    return {
        ...airQualityResponse.data.iaqi
    }
}

function mapWeather(weatherResponse) {
    return {
        'wind': weatherResponse.wind,
        'clouds': weatherResponse.clouds,
        ...weatherResponse.main
    }
}

async function getWeather(cityName) {
    console.log(`Calling OpenWeather API for city data: ${cityName}`)
    const key = apiConfigs.openWeatherMapData.apiKey;
    const response = await fetch(apiConfigs.openWeatherMapData.url + `?q=${cityName}&appId=${key}`);
    return await response.json();
}

async function getAirQuality(cityName) {
    console.log(`Calling AirQualityOpenData API for city data: ${cityName}`)
    const key = apiConfigs.airQualityOpenData.apiKey;
    const response = await fetch(apiConfigs.airQualityOpenData.url + `/${cityName}/?token=${key}`);
    return await response.json();
}

async function getGeoData(cityName) {
    console.log(`Calling OpenCageGeoData API for city data: ${cityName}`)
    const key = apiConfigs.openCageData.apiKey;
    const response = await fetch(apiConfigs.openCageData.url + `?key=${key}&q=${cityName}`);
    return await response.json();
}

export default {getCityStatus};
