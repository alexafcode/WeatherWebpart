import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
export const LeftContainer = styled.div`
  flex: 1;
`;

export const TempContainer = styled.div`
  text-align: center;
  font-weight: 400;
  line-height: 1.75rem;
  margin-bottom: 10%;
  header {
    font-size: 4vh;
    margin-bottom: 5%;
    color: lightgray;
  }
  span {
    font-size: 5vh;
    color: whitesmoke;
  }
`;

export const RealFeelContainer = styled.div`
  text-align: center;
  font-weight: 400;
  line-height: 4vh;
  margin-bottom: 10%;
  header {
    font-size: 3.5vh;
    color: lightgray;
  }
  span {
    font-size: 4vh;
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
  height: 150,
  width: 150,
}))<IIConProps>``;

export const RightContainer = styled.div`
  flex: 1;
  text-align: center;
  div {
    font-size: 2vh;
    color: whitesmoke;
    margin-bottom: 5%;
  }
  span {
    margin-left: 5%;
  }
`;
