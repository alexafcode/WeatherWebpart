import * as React from "react";
import { IWeatherWebPartProps, IWeatherState } from "./IWeatherWebPartProps";
import WeatherSearchBox from "./Search/WeatherSearchBox";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import ThemeContext from "./ThemeContext";
import { getCurrentWeather } from "./service/WeatherService";
import { Container, Text } from "./Weather.styled";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./WeatherWebPart.module.scss";

const WeatherWebPart: React.FC<IWeatherWebPartProps> = (props) => {
  const [weather, setWeather] = React.useState<IWeatherState>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const fetchedWeather = await getCurrentWeather(props.checkbox);
      console.log(fetchedWeather);
      setWeather(fetchedWeather);
      setLoading(false);
    };
    fetchWeather();
  }, [props.checkbox]);

  if (loading) return <Spinner size={SpinnerSize.large} />;

  return (
    <ThemeContext.Provider value={weather}>
      <div>
        <WeatherSearchBox />
        <Container IsDayTime={weather.IsDayTime}>
          <Header></Header>
          <Main></Main>
          <Footer></Footer>
        </Container>
      </div>
    </ThemeContext.Provider>
  );
};

export default WeatherWebPart;
