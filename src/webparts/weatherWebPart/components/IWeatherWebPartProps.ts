export interface IWeatherWebPartProps {
  description: string;
  isImperialUnits: string;
  isSearchDisable: string;
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
}

export interface ISearchResult {
  city: string;
  country: string;
  keyCity: string;
}
