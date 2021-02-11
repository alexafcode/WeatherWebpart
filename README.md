# SharePoint SPFX Weather Web Part

![alt text](https://github.com/alexafcode/WeatherWebpart/tree/main/src/webparts/weatherWebPart/img/WWP.png?raw=true)

## Table of Contents
- [Library features](#features)
- [Description](#description)
- [Installation](#installation)

## Description
A simple Weather app that displays weather information from the Accuweather API.
By default, the Weather web part will use the your location and you can search by city name and also display weather information for them.

## Library features
1. Search by name City.
2. Able Disable Search.
3. Switch temperature units

![alt text](https://github.com/alexafcode/WeatherWebpart/tree/main/src/webparts/weatherWebPart/img/Settings.png?raw=true)

## Installation
* Sign up over at developer.accuweather.com to get an API key.
* clone this repo
* Move to Solution folder
* $ npm i
* Create a file at the src\webparts\weatherWebPart\keys.ts with the following contents:
```
const config = {
  weather_key: "Your Api Key Here",
};
export default config;
```
* $ gulp serve
