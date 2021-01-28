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
  header {
    font-size: calc(0.75em + 1vmin);
    margin-bottom: 5%;
    color: lightgray;
  }
  span {
    font-size: calc(1.25em + 1vmin);
    color: whitesmoke;
  }
`;

export const RealFeelContainer = styled.div`
  text-align: center;
  font-weight: 400;
  line-height: 1rem;
  margin-bottom: 10%;
  header {
    font-size: calc(0.5em + 1vmin);
    color: lightgray;
    margin-bottom: 3%;
  }
  span {
    font-size: calc(1em + 1vmin);
    color: whitesmoke;
  }
`;

interface IIConProps {
  iconNumber: number;
}

const getIconUrl = (iconNumber: number) =>
  require(`../../assets/weather-icons/${iconNumber}.svg`);

//   background-image: ${({ iconNumber }) => `url(${getIconUrl(iconNumber)})`};
// `

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
  div {
    font-size: calc(0.5em + 1vmin);
    color: whitesmoke;
    margin-bottom: 5%;
  }
  span {
    margin-left: 5%;
    margin-bottom: 5%;
  }
`;
