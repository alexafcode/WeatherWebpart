export interface IWeatherWebPartProps {
  description: string;
  isSearchDisable: string;
  unit: string;
}

export interface IWeatherState {
  key: string;
  city: string;
  country: string;
  temp: string;
  windDirect: string;
  windSpeed: string;
  weatherText: string;
  realFeelTemperature: string;
  visibility: string;
  weatherIcon: number;
  IsDayTime: boolean;
  time: string;
  pressure: string;
  forecast?: IForecast[];
}

export interface ISearchResult {
  city: string;
  country: string;
  keyCity: string;
}

export interface IForecast {
  key: string;
  date: string;
  weekday: string;
  dayIcon: number;
  dayIconText: string;
  tempDay: string;
  nightIcon: number;
  tempNight: string;
}
