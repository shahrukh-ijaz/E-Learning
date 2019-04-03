import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Signup from "../views/signup";
import Signin from "../views/signin";
import Dashboard from "../views/Dashboard";
// import Profile from "./src/screens/Profile";

const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: Signup,
      navigationOptions: {
        header: null
      }
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        header: null
      }
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Signin"
  }
);

export default createAppContainer(AuthStack);
