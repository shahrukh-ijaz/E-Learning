import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Signup from "../views/signup";
import Signin from "../views/signin";
import Dashboard from "../views/Dashboard";
import onlineLesson from "../views/onlineLesson";
import bookingETest from "../views/bookingETest"; 
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
    }
  },
  {
    initialRouteName: "bookingETest"
  }
);

export default createAppContainer(AuthStack);
