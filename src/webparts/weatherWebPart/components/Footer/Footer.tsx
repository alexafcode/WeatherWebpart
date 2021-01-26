import * as React from "react";
import styled from "styled-components";
import ThemeContext from "../ThemeContext";
import { SaveContainer, InfoContainer, ButtonContainer } from "./styled";

const Container = styled.div`
  display: flex;
`;

const Footer = () => {
  const { weatherText, visibility } = React.useContext(ThemeContext).weather;

  return (
    <Container>
      <SaveContainer />
      <InfoContainer>
        <div>{weatherText}</div>
        <div>Visibility: {visibility}</div>
      </InfoContainer>
      <ButtonContainer />
    </Container>
  );
};

export default Footer;
