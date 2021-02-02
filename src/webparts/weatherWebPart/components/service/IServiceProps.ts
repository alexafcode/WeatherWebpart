export interface IGetWeatherType {
  ParentCity: {
    LocalizedName: string;
  };
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  country: string;
}

export interface IGetWeatherForCityType {
  response: Array<any>;
  queryKey: string;
}

export interface Iquery {
  LocalizedName: string;
  Country: {
    LocalizedName: string;
  };
  Key: string;
}

export interface IDailyForecasts {
  Date: string;
  Day: {
    Icon: number;
    IconPhrase: string;
  };
  Night: {
    Icon: number;
    IconPhrase: string;
  };
  Temperature: {
    Maximum: {
      Unit: string;
      Value: number;
    };
    Minimum: {
      Unit: string;
      Value: number;
    };
  };
}

export interface IForecastResponse {
  Headline: object;
  DailyForecasts: IDailyForecasts[];
}
