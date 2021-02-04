declare interface IWeatherWebPartWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  LabelUnitText: string;
}

declare module "WeatherWebPartWebPartStrings" {
  const strings: IWeatherWebPartWebPartStrings;
  export = strings;
}
