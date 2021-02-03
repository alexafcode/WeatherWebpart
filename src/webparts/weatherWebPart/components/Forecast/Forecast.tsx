import * as React from "react";
import { BaseText, LogoWeather, Container, ForecastContainer } from "./styled";
import ThemeContext from "../ThemeContext";

const Forecast: React.FC = () => {
  const { forecast } = React.useContext(ThemeContext).weather;

  const details = forecast.map((d) => {
    return (
      <ForecastContainer key={d.weekday}>
        <BaseText isWhite={true} size={"standart"}>
          {d.date}
        </BaseText>
        <BaseText size={"small"}>{d.weekday}</BaseText>
        <LogoWeather iconNumber={d.dayIcon}></LogoWeather>
        <BaseText size={"standart"}>Day:</BaseText>
        <BaseText isWhite={true}>{d.tempDay}</BaseText>
        <LogoWeather iconNumber={d.nightIcon}></LogoWeather>
        <BaseText size={"small"}>Night:</BaseText>
        <BaseText isWhite={true}>{d.tempNight}</BaseText>
        <BaseText size={"mini"}>{d.dayIconText}</BaseText>
      </ForecastContainer>
    );
  });

  return <Container>{details}</Container>;
};

export default Forecast;
