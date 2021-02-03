import * as React from "react";
import styled from "styled-components";
import ThemeContext from "../ThemeContext";
import { InfoContainer, TextContainer } from "./styled";

const Container = styled.div`
  display: flex;
`;

const Footer: React.FC = () => {
  const { weatherText, visibility } = React.useContext(ThemeContext).weather;

  return (
    <InfoContainer>
      <TextContainer>
        {weatherText} Visibility: {visibility}
      </TextContainer>
    </InfoContainer>
  );
};

export default Footer;
