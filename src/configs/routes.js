import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Signup from "../views/signup";
import Signin from "../views/signin";
import dashboard from "../views/dashboard";
import onlineLesson from "../views/onlineLesson";
import bookingETest from "../views/bookingETest";
import level from "../views/level";
import afterLevel from "../views/afterLevel";
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
    dashboard: {
      screen: dashboard,
      navigationOptions: {
        header: null
      }
    },
    onlineLesson: {
      screen: onlineLesson,
      navigationOptions: {
        header: null
      }
    },
    bookingETest: {
      screen: bookingETest,
      navigationOptions: {
        header: null
      }
    },
    level: {
      screen: level,
      navigationOptions: {
        header: null
      }
    },
    afterLevel: {
      screen: afterLevel,
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
