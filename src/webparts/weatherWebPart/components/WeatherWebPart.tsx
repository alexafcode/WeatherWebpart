import * as React from "react";
import {
  IWeatherWebPartProps,
  IWeatherState,
  ISearchResult,
} from "./IWeatherWebPartProps";
import WeatherSearchBox from "./Search/WeatherSearchBox";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import ThemeContext from "./ThemeContext";
import {
  getCurrentWeather,
  getWeatherForCityByKey,
} from "./service/WeatherService";
import { Container } from "./Weather.styled";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./WeatherWebPart.module.scss";

const WeatherWebPart: React.FC<IWeatherWebPartProps> = ({
  isImperialUnits,
  isSearchDisable,
}) => {
  const [weather, setWeather] = React.useState<IWeatherState>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const onChangeCity = async (query: ISearchResult): Promise<void> => {
    setLoading(true);
    const result = await getWeatherForCityByKey(query);
    setWeather(result);
    setLoading(false);
  };

  const value = { weather, onChangeCity };

  React.useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const fetchedWeather = await getCurrentWeather(isImperialUnits);
        setWeather(fetchedWeather);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [isImperialUnits]);

  if (loading) return <Spinner size={SpinnerSize.large} />;

  return (
    <ThemeContext.Provider value={value}>
      {!isSearchDisable && <WeatherSearchBox />}
      <Container IsDayTime={weather.IsDayTime}>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </Container>
    </ThemeContext.Provider>
  );
};

export default WeatherWebPart;
