import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LeftContainer = styled.div`
  flex: 1;
  margin-top: -5%;
`;

export const TempContainer = styled.div`
  text-align: center;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 10%;
`;

export const RealFeelContainer = styled.div`
  text-align: center;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 10%;
`;
interface IHeaderProps {
  size?: number;
  isWhite?: boolean;
}

export const Header = styled.div<IHeaderProps>`
  font-size: ${({ size }) => `calc(${size}em + 1vmin)`};
  color: ${({ isWhite }) => (isWhite ? "whitesmoke" : "lightgray")};
  margin-bottom: 5%;
`;
export const Span = styled.span<IHeaderProps>`
  font-size: ${({ size }) => `calc(${size}em + 1vmin)`};
  color: whitesmoke;
`;

interface IIConProps {
  iconNumber: number;
}

const getIconUrl = (iconNumber: number) =>
  require(`../../assets/weather-icons/${iconNumber}.svg`);

export const LogoWeather = styled.img.attrs<IIConProps>(({ iconNumber }) => ({
  src: `${String(getIconUrl(iconNumber))}`,
  height: 75,
  width: 75,
}))<IIConProps>`
  margin: auto;
`;

export const RightContainer = styled.div`
  flex: 1;
  text-align: center;
  margin-top: -5%;
`;
