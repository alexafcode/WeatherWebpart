import * as React from "react";
import { IWeatherState } from "./IWeatherWebPartProps";

const ThemeContext = React.createContext<IWeatherState>(null);

export default ThemeContext;
