import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "WeatherWebPartWebPartStrings";
import WeatherWebPart from "./components/WeatherWebPart";
import { IWeatherWebPartProps } from "./components/IWeatherWebPartProps";

export interface IWeatherWebPartWebPartProps {
  description: string;
  isImperialUnits: string;
  isSearchDisable: string;
}

export default class WeatherWebPartWebPart extends BaseClientSideWebPart<IWeatherWebPartWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWeatherWebPartProps> = React.createElement(
      WeatherWebPart,
      {
        description: this.properties.description,
        isImperialUnits: this.properties.isImperialUnits,
        isSearchDisable: this.properties.isSearchDisable,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private labelboxProperty: string = "Use Imperial Units";
  private labelboxSearchProperty: string = "Disable Search";

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneCheckbox("isImperialUnits", {
                  text: this.labelboxProperty,
                  checked: false,
                }),
                PropertyPaneCheckbox("isSearchDisable", {
                  text: this.labelboxSearchProperty,
                  checked: false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
