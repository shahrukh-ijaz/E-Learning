import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Signup from "../components/views/signup";
import Signin from "../components/views/signin";
import dashboard from "../components/views/dashboard";
import onlineLesson from "../components/views/onlineLesson";
import bookingETest from "../components/views/bookingETest";
import level from "../components/views/level";
import afterLevel from "../components/views/afterLevel";
import footer from "../components/customComponents/footer";
import header from "../components/customComponents/header";
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
      screen: dashboard,
      navigationOptions: {
        header: null
      }
    },
    OnlineLesson: {
      screen: onlineLesson,
      navigationOptions: {
        header: null
      }
    },
    BookingETest: {
      screen: bookingETest,
      navigationOptions: {
        header: null
      }
    },
    Level: {
      screen: level,
      navigationOptions: {
        header: null
      }
    },
    AfterLevel: {
      screen: afterLevel,
      navigationOptions: {
        header: null
      }
    },
    Footer: {
      screen: footer,
      navigationOptions: {
        header: null
      }
    },
    Header: {
      screen: header,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Dashboard"
  }
);

export default createAppContainer(AuthStack);
