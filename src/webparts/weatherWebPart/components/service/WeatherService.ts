import { IWeatherState, ISearchResult } from "../IWeatherWebPartProps";
import config from "../../keys";
// GeolocationPosition

const _startUrl = "https://dataservice.accuweather.com";
const _key: string = config.weather_key;
let units: string;

const sleep = (milleseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milleseconds));

export const getCurrentWeather = async (
  isImperialUnits: string
): Promise<IWeatherState> => {
  const isImperial = Boolean(isImperialUnits);
  units = isImperial ? "Imperial" : "Metric";
  ///
  // await sleep(1000);
  // return t;
  ///////////
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const weather = await getWeather(position);
          resolve(weather);
        },
        (err) => reject(`Can't get current location: ${err.message}`)
      );
    } else {
      reject("geolocation is Not Supported");
    }
  });
};

const getResource = async <T>(url: string): Promise<T> => {
  const res: Response = await fetch(`${_startUrl}${url}`, { mode: "cors" });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};

interface IGetWeatherType {
  ParentCity: {
    LocalizedName: string;
  };
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  country: string;
}
export async function getWeather(position: GeolocationPosition) {
  const { latitude, longitude } = position.coords;
  const url = `/locations/v1/cities/geoposition/search?apikey=${_key}&q=${latitude},${longitude}&language=en-en`;
  try {
    const res = await getResource<IGetWeatherType>(url);
    const names = {
      cityName: res.ParentCity
        ? res.ParentCity.LocalizedName
        : res.LocalizedName,
      countryName: res.Country ? res.Country.LocalizedName : res.country,
    };
    const data = await getWeatherForCity(res);
    return transformCity(data, names);
  } catch (e) {
    console.error(e);
  }
}

interface IGetWeatherForCityType {
  response: Array<any>;
  queryKey: string;
}

export async function getWeatherForCity(data) {
  const queryKey: string = data.Key ? data.Key : data.selectCity.Key;
  const url = `/currentconditions/v1/${queryKey}?apikey=${_key}&language=en-en&details=true`;
  const response = await getResource<IGetWeatherForCityType>(url);
  return {
    res: response[0],
    queryKey,
  };
}

export async function getWeatherForCityByKey(query: ISearchResult) {
  const { keyCity, city, country } = query;
  const url = `/currentconditions/v1/${keyCity}?apikey=${_key}&language=en-en&details=true`;
  const response = await getResource<IGetWeatherForCityType>(url);
  const cityData = {
    cityName: city,
    countryName: country,
  };
  const res = {
    res: response[0],
    keyCity,
  };
  return transformCity(res, cityData);
}

export function transformCity(data, city): IWeatherState {
  const { res, queryKey } = data;
  const time = new Date(res.LocalObservationDateTime).toLocaleString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
  return weatherState;
}
interface Iquery {
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  Key: string;
}
export async function getSearchCity(query) {
  const url = `/locations/v1/cities/autocomplete?apikey=${_key}&q=${query}&language=en-en`;
  const result = await getResource<Iquery[]>(url);
  return result.map((el: Iquery) => {
    return {
      country: el.Country.LocalizedName,
      city: el.LocalizedName,
      keyCity: el.Key,
    };
  });
}

// https://dataservice.accuweather.com/currentconditions/v1/294922?apikey=&language=en-en&details=true
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
