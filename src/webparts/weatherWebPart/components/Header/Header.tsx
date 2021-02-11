import * as React from "react";
import styled from "styled-components";
import ThemeContext from "../ThemeContext";

const Container = styled.div`
  text-align: center;
  .header__time {
    font-size: 1rem;
    color: wheat;
    margin-top: 0.5rem;
  }
  .header__location {
    font-size: 0.8rem;
    margin: 0.5rem;
    margin-bottom: 1rem;
    color: wheat;
  }
`;

const Headrer: React.FC = () => {
  const { time, country, city } = React.useContext(ThemeContext).weather;
  return (
    <Container>
      <div className={"header__time"}>{time}</div>
      <div className={"header__location"}>
        {country}, {city}
      </div>
    </Container>
  );
};

export default Headrer;
