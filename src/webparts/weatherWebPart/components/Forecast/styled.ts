import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  text-align: center;
  padding: 1%;
`;

export const ForecastContainer = styled.div`
  flex: 1;
`;

const handleTextSize = (size: string) => {
  switch (size) {
    case "mini":
      return "calc(0.1em + 1vmin)";
    case "small":
      return "calc(0.2em + 1vmin)";
    case "standart":
      return "calc(0.3em + 1vmin)";
    default:
      return "calc(0.4em + 1vmin)";
  }
};
interface IBaseColor {
  size?: string;
  isWhite?: boolean;
}

export const BaseText = styled.p<IBaseColor>`
  color: white;
  color: ${({ isWhite }) => (isWhite ? "white" : "lightgray")};
  font-size: ${({ size }) => handleTextSize(size)};
  margin: auto;
  justify-content: space-around;
`;
interface IIConProps {
  iconNumber: number;
}

const getIconUrl = (iconNumber: number) =>
  require(`../../assets/weather-icons/${iconNumber}.svg`);

export const LogoWeather = styled.img.attrs<IIConProps>(({ iconNumber }) => ({
  src: `${String(getIconUrl(iconNumber))}`,
  height: 35,
  width: 35,
}))<IIConProps>`
  margin: auto;
`;
