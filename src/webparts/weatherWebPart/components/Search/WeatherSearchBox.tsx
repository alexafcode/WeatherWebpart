import * as React from "react";
import { ISearchResult } from "../IWeatherWebPartProps";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import {
  DetailsList,
  SelectionMode,
  CheckboxVisibility,
  IColumn,
  Selection,
  IObjectWithKey,
} from "office-ui-fabric-react";
import { getSearchCity } from "../service/WeatherService";
import { SearchResultContainer, searchBoxStyles } from "./styled";
import ThemeContext from "../ThemeContext";

const WeatherSearchBox: React.FC = () => {
  const [searchResult, setSearchResult] = React.useState<ISearchResult[]>(null);
  const [showSearchResult, setShowSearchResult] = React.useState<boolean>(
    false
  );

  const { onChangeCity } = React.useContext(ThemeContext);

  const getSelectionDetails = (): void => {
    const item: IObjectWithKey[] = selection.getSelection();
    const query = item[0] as ISearchResult;
    onChangeCity(query);
  };

  const selection = new Selection({
    onSelectionChanged: () => getSelectionDetails(),
  });

  const wrapperRef = React.useRef(null);

  const handleClickOutside = (ev: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
      setShowSearchResult(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "City",
      fieldName: "City",
      minWidth: 100,
      maxWidth: 100,
      data: "string",
      onRender: (item: ISearchResult) => {
        return <span>{item.city}</span>;
      },
    },
    {
      key: "column2",
      name: "Country",
      fieldName: "name",
      minWidth: 100,
      maxWidth: 100,
      data: "string",
      onRender: (item: ISearchResult) => {
        return <span>{item.country}</span>;
      },
    },
  ];

  return (
    <form>
      <SearchBox
        styles={searchBoxStyles}
        autoComplete={"off"}
        placeholder="Search City"
        underlined={true}
        onSearch={(newValue) => {
          getSearchCity(newValue).then((r) => {
            setSearchResult(r);
            setShowSearchResult(true);
          });
        }}
      />
      {showSearchResult && (
        <SearchResultContainer ref={wrapperRef}>
          <DetailsList
            items={searchResult}
            className={"search-list"}
            compact={true}
            selectionMode={SelectionMode.single}
            checkboxVisibility={CheckboxVisibility.hidden}
            isHeaderVisible={false}
            columns={columns}
            selection={selection}
          ></DetailsList>
        </SearchResultContainer>
      )}
    </form>
  );
};

export default WeatherSearchBox;
