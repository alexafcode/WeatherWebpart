import * as React from "react";
import ThemeContext from "../ThemeContext";
import {
  Container,
  LeftContainer,
  RightContainer,
  LogoWeather,
  TempContainer,
  RealFeelContainer,
} from "./styled";

const iconPressure = require(`../../assets/weather-icons/icon-pressure.png`);

const Main: React.FC = () => {
  const {
    temp,
    realFeelTemperature,
    weatherIcon,
    windDirect,
    windSpeed,
    pressure,
  } = React.useContext(ThemeContext);

  return (
    <Container>
      <LeftContainer>
        <TempContainer>
          <header>Now:</header>
          <span>{temp}</span>
        </TempContainer>
        <RealFeelContainer>
          <header>Real Feel:</header>
          <span>{realFeelTemperature}</span>
        </RealFeelContainer>
      </LeftContainer>
      <LogoWeather iconNumber={weatherIcon}></LogoWeather>
      <RightContainer>
        <div>
          <span>Wind:</span>
          <span>{windDirect}</span>
        </div>
        {/* <div>Wind Gusts:{windSpeed}</div> */}
        <div>
          <span>Wind Gusts:</span>
          <span>{windSpeed}</span>
        </div>
        <div>
          <img src={String(iconPressure)} alt="pressure" />
          <span>{pressure}</span>
        </div>
      </RightContainer>
    </Container>
  );
};

export default Main;
