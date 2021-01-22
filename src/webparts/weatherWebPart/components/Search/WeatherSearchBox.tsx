import * as React from "react";
import {
  SearchBox,
  ISearchBoxStyles,
} from "office-ui-fabric-react/lib/SearchBox";

const WeatherSearchBox: React.FC = () => {
  const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: { width: 200, margin: "auto auto 1%" },
  };
  return (
    <SearchBox
      styles={searchBoxStyles}
      placeholder="Search City"
      underlined={true}
      onEscape={(ev) => {
        console.log("Custom onEscape Called");
      }}
      onClear={(ev) => {
        console.log("Custom onClear Called");
      }}
      onChange={(newValue) =>
        console.log("SearchBox onChange fired: " + newValue)
      }
      onSearch={(newValue) =>
        console.log("SearchBox onSearch fired: " + newValue)
      }
    />
  );
};

export default WeatherSearchBox;
