import React, { Component } from "react";
import getTheme from "./native-base-theme/components";
import AppNavigator from "./src/configs/routes";
import { createAppContainer } from "react-navigation";
import platform from "./native-base-theme/variables/platform";
import { StyleProvider } from "native-base";
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <AppContainer />
      </StyleProvider>
    );
  }
}
