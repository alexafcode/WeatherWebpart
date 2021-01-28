import styled from "styled-components";
import { device } from "./deivce";

const dayIcon = require(`../assets/weather-icons/day.jpg`);
const nightIcon = require(`../assets/weather-icons/night.jpg`);

interface IContainerProps {
  IsDayTime: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 40%;
  max-width: 700px;
  margin: 0px auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  background: ${({ IsDayTime }) =>
    IsDayTime ? `url(${dayIcon})` : `url(${nightIcon})`};
  background-size: cover;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
  border-radius: 1rem;
  @media ${device.tablet} {
    width: 100%;
  }
`;
