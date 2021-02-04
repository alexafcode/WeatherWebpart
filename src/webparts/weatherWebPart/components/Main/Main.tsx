import * as React from "react";
import ThemeContext from "../ThemeContext";
import {
  Container,
  LeftContainer,
  RightContainer,
  LogoWeather,
  TempContainer,
  RealFeelContainer,
  Header,
  Span,
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
  } = React.useContext(ThemeContext).weather;

  const leftContainer = (
    <LeftContainer>
      <TempContainer>
        <Header size={0.75}>Now:</Header>
        <Span size={1.25}>{temp}</Span>
      </TempContainer>
      <RealFeelContainer>
        <Header size={0.5}>Real Feel:</Header>
        <Span size={1}>{realFeelTemperature}</Span>
      </RealFeelContainer>
    </LeftContainer>
  );

  const rightContainer = (
    <RightContainer>
      <Header size={0.5} isWhite={true}>
        Wind: {windDirect}
      </Header>
      <div>
        <Header size={0.5} isWhite={true}>
          Wind Gusts:
        </Header>
        <Header size={0.5} isWhite={true}>
          {windSpeed}
        </Header>
      </div>
      <div>
        <img src={String(iconPressure)} alt="pressure" />
        <Span>{pressure}</Span>
      </div>
    </RightContainer>
  );

  return (
    <Container>
      {leftContainer}
      <LogoWeather iconNumber={weatherIcon}></LogoWeather>
      {rightContainer}
    </Container>
  );
};

export default Main;
