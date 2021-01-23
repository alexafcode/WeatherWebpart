export interface IWeatherWebPartProps {
  description: string;
  checkbox: string;
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
