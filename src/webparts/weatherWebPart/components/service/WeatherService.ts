import { IWeatherState } from "../IWeatherWebPartProps";
import config from "../../keys";
// GeolocationPosition

const _startUrl = "https://dataservice.accuweather.com";
const _key: string = config.weather_key;
let units: string;

const sleep = (milleseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milleseconds));

export const getCurrentWeather = async (
  checkbox: string
): Promise<IWeatherState> => {
  const un = Boolean(checkbox);
  units = un ? "Imperial" : "Metric";
  ///
  await sleep(1000);
  return t;
  ///////////
  // return new Promise((resolve, reject) => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position: GeolocationPosition) => {
  //         const weather = await getWeather(position);
  //         resolve(weather);
  //       },
  //       (err) => reject(`Can't get current location: ${err.message}`)
  //     );
  //   } else {
  //     reject("geolocation is Not Supported");
  //   }
  // });
};

const getResource = async (url: string): Promise<any> => {
  const res = await fetch(`${_startUrl}${url}`, { mode: "cors" });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};

export async function getWeather(position: GeolocationPosition) {
  const { latitude, longitude } = position.coords;
  const url = `/locations/v1/cities/geoposition/search?apikey=${_key}&q=${latitude},${longitude}&language=en-en`;
  const json = await getResource(url);
  const names = {
    cityName: json.ParentCity
      ? json.ParentCity.LocalizedName
      : json.LocalizedName,
    countryName: json.Country ? json.Country.LocalizedName : json.country,
  };
  const cityData = await getWeatherForCity(json);
  console.log(cityData);
  return transformCity(cityData, names);
}

export async function getWeatherForCity(data) {
  const queryKey = data.Key ? data.Key : data.selectCity.Key;
  const url = `/currentconditions/v1/${queryKey}?apikey=${_key}&language=en-en&details=true`;
  const json = await getResource(url);
  const item = {
    res: json[0],
    queryKey,
  };
  return item;
}

export function transformCity(data, city): IWeatherState {
  const { res, queryKey } = data;
  const time = new Date(res.LocalObservationDateTime).toLocaleString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  //return {
  // const units = "Metric"; //"Imperial";

  const weatherState: IWeatherState = {
    key: queryKey,
    city: city.cityName,
    country: city.countryName,
    temp: `${res.Temperature[units].Value.toFixed()}°  ${
      res.Temperature[units].Unit
    }`,
    windDirect: res.Wind.Direction.Localized,
    windSpeed: `${res.Wind.Speed[units].Value}  ${res.Wind.Speed[units].Unit}`,
    weatherText: res.WeatherText,
    realFeelTemperature: `${res.RealFeelTemperature[units].Value.toFixed()}° ${
      res.RealFeelTemperature[units].Unit
    }`,
    visibility: `${res.Visibility[units].Value} ${res.Visibility[units].Unit}`,
    weatherIcon: res.WeatherIcon,
    IsDayTime: res.IsDayTime,
    time: time,
    pressure: `${res.Pressure[units].Value} mb`,
  };
  console.log(weatherState);
  return weatherState;
}

// https://dataservice.accuweather.com/currentconditions/v1/294922?apikey=eMnxDj2GF4ffTteDsanTrmQEaP2mgUIA&language=en-en&details=true
const t: IWeatherState = {
  IsDayTime: true,
  city: "Perm",
  country: "Russia",
  key: "294922",
  pressure: "1016 mb",
  realFeelTemperature: "-25° C",
  temp: "-18°  C",
  time: "January 22, 2021",
  visibility: "8 km",
  weatherIcon: 20,
  weatherText: "Light snow",
  windDirect: "ENE",
  windSpeed: "8.1  mi/h",
};
