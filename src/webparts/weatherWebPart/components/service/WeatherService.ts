import {
  IWeatherState,
  ISearchResult,
  IForecast,
} from "../IWeatherWebPartProps";
import {
  IGetWeatherType,
  IGetWeatherForCityType,
  Iquery,
  IDailyForecasts,
  IForecastResponse,
} from "./IServiceProps";
import config from "../../keys";
import { mockForecast, mockWeatherState } from "./mockData";

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
  // return mockWeatherState;
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
    const forecast = await getForecastForCity(data.queryKey);
    return transformCity(data, names, forecast);
  } catch (e) {
    console.error(e);
  }
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

export function transformCity(
  data,
  city,
  forecast?: IForecast[]
): IWeatherState {
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
    forecast: forecast,
  };
  return weatherState;
}

export async function getSearchCity(query: string) {
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

export async function getForecastForCity(
  queryKey: string
): Promise<IForecast[]> {
  ///return mockForecast;
  ////
  const url = `/forecasts/v1/daily/5day/${queryKey}?apikey=${_key}&language=en-en&${units}=true`;
  const result = await getResource<IForecastResponse>(url);
  const res: IDailyForecasts[] = result.DailyForecasts;
  return res.map((el) => {
    return {
      key: queryKey,
      date: new Date(el.Date).toLocaleString("en", {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(el.Date).toLocaleString("en", {
        weekday: "long",
      }),
      dayIcon: el.Day.Icon,
      dayIconText: el.Day.IconPhrase,
      tempDay: `${el.Temperature.Maximum.Value.toFixed()} ° ${
        el.Temperature.Maximum.Unit
      }`, //units
      nightIcon: el.Night.Icon,
      tempNight: `${el.Temperature.Minimum.Value.toFixed()} ° ${
        el.Temperature.Minimum.Unit
      }`,
    };
  });
}
