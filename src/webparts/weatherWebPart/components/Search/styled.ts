import styled from "styled-components";
import { ISearchBoxStyles } from "office-ui-fabric-react/lib/SearchBox";

export const SearchResultContainer = styled.div`
  background-color: #faf9f8;
  width: 250px;
  margin: auto;
  border-radius: 10px;
  .search-list {
    position: absolute;
    max-height: 80%;
  }
`;

export const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: { width: 200, margin: "auto auto 1%" },
};
