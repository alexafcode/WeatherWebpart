import styled from "styled-components";
import { FontSizes } from "@fluentui/theme";

const dayIcon = require(`../assets/weather-icons/day.jpg`);
const nightIcon = require(`../assets/weather-icons/night.jpg`);

interface IContainerProps {
  IsDayTime: boolean;
}
interface ITextProps {
  color?: string;
  fonts?: string;
  margin?: false;
}

export const Container = styled.div<IContainerProps>`
  width: 80%;
  max-width: 700px;
  margin: 0px auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  background: ${({ IsDayTime }) =>
    IsDayTime ? `url(${dayIcon})` : `url(${nightIcon})`};
  background-size: cover;
  overflow: hidden;
  // font-family: "Comic Sans MS";
  font-family: "Roboto", sans-serif;
  /* display: flex;
  flex-direction: column; */
  border-radius: 1rem;
`;

export const Text = styled.div<ITextProps>`
  text-align: center;
  color: ${({ color }) => (`${color}` ? `${color}` : "white")};
  font-size: ${({ fonts }) => {
    switch (fonts) {
      case "small":
        return `${FontSizes.size14}`;
      case "medium":
        return `${FontSizes.size24}`;
      case "large":
        return `${FontSizes.size32}`;
      default:
        return `${FontSizes.size12}`;
    }
  }};
`;
