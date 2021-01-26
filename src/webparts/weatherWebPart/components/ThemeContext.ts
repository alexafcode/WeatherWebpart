import * as React from "react";
import { IWeatherState, ISearchResult } from "./IWeatherWebPartProps";

interface IContex {
  weather: IWeatherState;
  onChangeCity(query: ISearchResult): Promise<void>;
}

const ThemeContext = React.createContext<IContex>(null);

export default ThemeContext;
